import { categories, TRANSFER_PROTOCOL } from "@/constants";
import { useClueStore } from "@/storage/stores";
import { Clue, JsonRecord, PreparedTransfer, TransferFrame } from "@/types";
import {
  CryptoDigestAlgorithm,
  CryptoEncoding,
  digestStringAsync,
  randomUUID,
} from "expo-crypto";

const DEFAULT_QR_CHUNK_SIZE = 260;
const MAX_TRANSFER_CHUNK_SIZE = 1024;
const MAX_TRANSFER_FRAMES = 512;

const MAX_TRANSFER_PAYLOAD_BYTES =
  MAX_TRANSFER_FRAMES * MAX_TRANSFER_CHUNK_SIZE;
const MAX_TRANSFER_FRAME_BYTES = 4096;

const MAX_UTF8_CHARACTER_BYTES = 4;
const DEFAULT_CHUNK_SAFE_BYTES =
  DEFAULT_QR_CHUNK_SIZE - (MAX_UTF8_CHARACTER_BYTES - 1);

const utf8TextEncoder =
  typeof TextEncoder !== "undefined" ? new TextEncoder() : null;

const UUID_V4_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SHA256_HEX_REGEX = /^[0-9a-f]{64}$/i;

const validCategoryIds = new Set(
  categories
    .filter((category) => category.id !== "all" && category.id !== "favorites")
    .map((category) => category.id),
);

const isJsonRecord = (value: unknown): value is JsonRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isValidInteger = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value);

const isValidTransferId = (value: unknown): value is string =>
  typeof value === "string" && UUID_V4_REGEX.test(value);

const isValidChecksum = (value: unknown): value is string =>
  typeof value === "string" && SHA256_HEX_REGEX.test(value);

const isValidTransferFrame = (value: unknown): value is TransferFrame => {
  if (!isJsonRecord(value)) {
    return false;
  }

  const { protocol, transferId, checksum, chunk, totalChunks, chunkIndex } =
    value;

  return (
    protocol === TRANSFER_PROTOCOL &&
    isValidTransferId(transferId) &&
    isValidChecksum(checksum) &&
    typeof chunk === "string" &&
    getStringUtf8ByteLength(chunk) <= MAX_TRANSFER_CHUNK_SIZE &&
    isValidInteger(totalChunks) &&
    totalChunks >= 1 &&
    totalChunks <= MAX_TRANSFER_FRAMES &&
    isValidInteger(chunkIndex) &&
    chunkIndex >= 0 &&
    chunkIndex < totalChunks
  );
};

const parseClue = (value: unknown): Clue | null => {
  if (!isJsonRecord(value)) {
    return null;
  }

  const { id, title, text, categoryId, isFavorite } = value;

  if (
    typeof id !== "string" ||
    !UUID_V4_REGEX.test(id) ||
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof text !== "string" ||
    text.trim() === "" ||
    typeof categoryId !== "string" ||
    !validCategoryIds.has(categoryId) ||
    typeof isFavorite !== "boolean"
  ) {
    return null;
  }

  return { id, title, text, categoryId, isFavorite };
};

const hashPayload = async (value: string) => {
  const digest = await digestStringAsync(CryptoDigestAlgorithm.SHA256, value, {
    encoding: CryptoEncoding.HEX,
  });

  return digest.toLowerCase();
};

const getUtf8ByteLength = (character: string): number => {
  const codePoint = character.codePointAt(0);

  if (codePoint === undefined) {
    return 0;
  }

  if (codePoint <= 0x7f) return 1;
  if (codePoint <= 0x7ff) return 2;
  if (codePoint <= 0xffff) return 3;
  return MAX_UTF8_CHARACTER_BYTES;
};

const fitsDefaultFrameLimit = (payloadBytes: number) =>
  payloadBytes <= MAX_TRANSFER_FRAMES * DEFAULT_CHUNK_SAFE_BYTES;

const getStringUtf8ByteLength = (value: string): number => {
  if (utf8TextEncoder) {
    return utf8TextEncoder.encode(value).length;
  }

  let bytes = 0;

  for (const character of value) {
    bytes += getUtf8ByteLength(character);
  }

  return bytes;
};

const splitIntoChunks = (value: string, chunkSize: number) => {
  if (!Number.isInteger(chunkSize) || chunkSize < 1) {
    throw new Error("chunkSize must be a positive integer");
  }

  if (chunkSize < MAX_UTF8_CHARACTER_BYTES) {
    throw new Error(
      `chunkSize must be at least ${MAX_UTF8_CHARACTER_BYTES} bytes to accommodate all UTF-8 characters`,
    );
  }

  if (chunkSize > MAX_TRANSFER_CHUNK_SIZE) {
    throw new Error(
      `chunkSize must be less than or equal to ${MAX_TRANSFER_CHUNK_SIZE}`,
    );
  }

  if (!value.length) {
    throw new Error("Cannot split empty payload");
  }

  const chunks: string[] = [];
  let currentChunk = "";
  let currentChunkBytes = 0;

  for (const character of value) {
    const characterBytes = getUtf8ByteLength(character);

    if (
      currentChunkBytes > 0 &&
      currentChunkBytes + characterBytes > chunkSize
    ) {
      chunks.push(currentChunk);
      currentChunk = character;
      currentChunkBytes = characterBytes;
      continue;
    }

    currentChunk += character;
    currentChunkBytes += characterBytes;
  }

  if (currentChunk.length) {
    chunks.push(currentChunk);
  }

  return chunks;
};

const findChunkSizeForFrameLimit = (
  payload: string,
  initialChunkSize: number,
) => {
  const startingChunkSize = Math.max(
    MAX_UTF8_CHARACTER_BYTES,
    initialChunkSize,
  );

  let low = startingChunkSize;
  let high = MAX_TRANSFER_CHUNK_SIZE;
  let bestChunkSize: number | null = null;

  while (low <= high) {
    const candidateChunkSize = Math.floor((low + high) / 2);
    const chunks = splitIntoChunks(payload, candidateChunkSize);

    if (chunks.length <= MAX_TRANSFER_FRAMES) {
      bestChunkSize = candidateChunkSize;
      high = candidateChunkSize - 1;
      continue;
    }

    low = candidateChunkSize + 1;
  }

  if (bestChunkSize === null) {
    throw new Error("Transfer payload is too large for QR frame limits");
  }

  return bestChunkSize;
};

export const prepareTransferFrames = async (
  chunkSize = DEFAULT_QR_CHUNK_SIZE,
): Promise<PreparedTransfer> => {
  const clues = useClueStore.getState().clues;

  if (!clues.length) {
    throw new Error("No clues available to transfer");
  }

  const payload = JSON.stringify(clues);
  const payloadBytes = getStringUtf8ByteLength(payload);

  if (payloadBytes > MAX_TRANSFER_PAYLOAD_BYTES) {
    throw new Error("Transfer payload is too large");
  }

  const minimumChunkSize = Math.ceil(payloadBytes / MAX_TRANSFER_FRAMES);
  const effectiveChunkSize =
    chunkSize === DEFAULT_QR_CHUNK_SIZE && fitsDefaultFrameLimit(payloadBytes)
      ? DEFAULT_QR_CHUNK_SIZE
      : findChunkSizeForFrameLimit(
          payload,
          Math.max(chunkSize, minimumChunkSize),
        );

  const checksum = await hashPayload(payload);
  const transferId = randomUUID();
  const chunks = splitIntoChunks(payload, effectiveChunkSize);

  if (chunks.length > MAX_TRANSFER_FRAMES) {
    throw new Error("Transfer requires too many QR frames");
  }

  const frames = chunks.map((chunk, chunkIndex) =>
    JSON.stringify({
      protocol: TRANSFER_PROTOCOL,
      transferId,
      totalChunks: chunks.length,
      chunkIndex,
      checksum,
      chunk,
    } satisfies TransferFrame),
  );

  return {
    transferId,
    checksum,
    totalChunks: chunks.length,
    frames,
  };
};

export const parseTransferFrame = (value: string): TransferFrame | null => {
  if (
    typeof value !== "string" ||
    !value.length ||
    getStringUtf8ByteLength(value) > MAX_TRANSFER_FRAME_BYTES
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!isValidTransferFrame(parsed)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
};

export const assembleTransferPayload = async (
  chunksByIndex: Map<number, string>,
  totalChunks: number,
  checksum: string,
): Promise<string | null> => {
  if (
    !Number.isInteger(totalChunks) ||
    totalChunks < 1 ||
    totalChunks > MAX_TRANSFER_FRAMES
  ) {
    return null;
  }

  if (!isValidChecksum(checksum)) {
    return null;
  }

  if (chunksByIndex.size !== totalChunks) {
    return null;
  }

  let payloadBytes = 0;
  const orderedChunks: string[] = [];

  for (let index = 0; index < totalChunks; index += 1) {
    const chunk = chunksByIndex.get(index);
    if (typeof chunk !== "string") {
      return null;
    }

    const chunkBytes = getStringUtf8ByteLength(chunk);
    if (chunkBytes > MAX_TRANSFER_CHUNK_SIZE) {
      return null;
    }

    payloadBytes += chunkBytes;
    if (payloadBytes > MAX_TRANSFER_PAYLOAD_BYTES) {
      return null;
    }

    orderedChunks.push(chunk);
  }

  const payload = orderedChunks.join("");

  let hashedPayload: string;
  try {
    hashedPayload = await hashPayload(payload);
  } catch {
    return null;
  }

  if (hashedPayload !== checksum.toLowerCase()) {
    return null;
  }

  return payload;
};

export const parseCluesPayload = (payload: string): Clue[] | null => {
  if (
    typeof payload !== "string" ||
    !payload.length ||
    getStringUtf8ByteLength(payload) > MAX_TRANSFER_PAYLOAD_BYTES
  ) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(payload);
    if (!Array.isArray(parsed)) {
      return null;
    }

    const seenIds = new Set<string>();
    const sanitizedClues: Clue[] = [];

    for (const item of parsed) {
      const clue = parseClue(item);

      if (!clue || seenIds.has(clue.id)) {
        return null;
      }

      seenIds.add(clue.id);
      sanitizedClues.push(clue);
    }

    return sanitizedClues;
  } catch {
    return null;
  }
};
