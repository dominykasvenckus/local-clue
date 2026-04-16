import { TRANSFER_PROTOCOL } from "@/constants/transfer";

export type JsonRecord = Record<string, unknown>;

export type TransferFrame = {
  protocol: typeof TRANSFER_PROTOCOL;
  transferId: string;
  totalChunks: number;
  chunkIndex: number;
  checksum: string;
  chunk: string;
};

export type PreparedTransfer = {
  transferId: string;
  checksum: string;
  totalChunks: number;
  frames: string[];
};
