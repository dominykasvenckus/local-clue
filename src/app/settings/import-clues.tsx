import { ScannerOverlay, type ScannerOverlayHandle } from "@/components";
import { useAppState } from "@/hooks";
import {
  assembleTransferPayload,
  parseCluesPayload,
  parseTransferFrame,
} from "@/lib";
import { useClueStore } from "@/storage/stores";
import { TransferSession } from "@/types";
import { useIsFocused } from "expo-router";
import { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import {
  Barcode,
  useBarcodeScannerOutput,
} from "react-native-vision-camera-barcode-scanner";

const createEmptySession = (): TransferSession => ({
  transferId: null,
  totalChunks: 0,
  checksum: null,
});

export default function ImportClues() {
  const appState = useAppState();
  const isFocused = useIsFocused();
  const mergeClues = useClueStore((state) => state.mergeClues);
  const session = useRef<TransferSession>(createEmptySession());
  const chunksByIndex = useRef(new Map<number, string>());
  const isImporting = useRef(false);
  const hasFinishedImport = useRef(false);
  const scannerOverlayRef = useRef<ScannerOverlayHandle>(null);

  const devices = useCameraDevices();
  const backDevices = devices.filter((d) => d.position === "back");
  const priority = ["quad", "triple", "dual-wide", "dual", "wide-angle"];
  const device =
    priority
      .map((type) => backDevices.find((d) => d.type === type))
      .find((matchedDevice) => matchedDevice !== undefined) || backDevices[0];

  const resetSession = () => {
    chunksByIndex.current.clear();
    session.current = createEmptySession();
    hasFinishedImport.current = false;
    isImporting.current = false;
  };

  const processCode = async (code: Barcode) => {
    if (hasFinishedImport.current || isImporting.current || !code.rawValue) {
      return;
    }

    const frame = parseTransferFrame(code.rawValue);
    if (!frame) {
      return;
    }

    if (!session.current.transferId) {
      session.current = {
        transferId: frame.transferId,
        totalChunks: frame.totalChunks,
        checksum: frame.checksum,
      };
      scannerOverlayRef.current?.setReceivedChunks(0);
      scannerOverlayRef.current?.setTotalChunks(frame.totalChunks);
      scannerOverlayRef.current?.setStatus("Keep scanning the remaining codes");
    }

    const activeSession = session.current;
    if (
      !activeSession.transferId ||
      !activeSession.checksum ||
      activeSession.totalChunks < 1
    ) {
      return;
    }

    if (
      frame.transferId !== activeSession.transferId ||
      frame.totalChunks !== activeSession.totalChunks ||
      frame.checksum !== activeSession.checksum
    ) {
      scannerOverlayRef.current?.setStatus(
        "Transfer mismatch. Reset the session to import from this code instead",
        "error",
      );
      return;
    }

    const existingChunk = chunksByIndex.current.get(frame.chunkIndex);
    if (typeof existingChunk === "string") {
      return;
    }

    chunksByIndex.current.set(frame.chunkIndex, frame.chunk);
    scannerOverlayRef.current?.setReceivedChunks(chunksByIndex.current.size);

    if (chunksByIndex.current.size !== activeSession.totalChunks) {
      return;
    }

    isImporting.current = true;

    try {
      const payload = await assembleTransferPayload(
        chunksByIndex.current,
        activeSession.totalChunks,
        activeSession.checksum,
      );

      if (session.current.transferId !== activeSession.transferId) {
        return;
      }

      if (!payload) {
        scannerOverlayRef.current?.setStatus(
          "Data verification failed. Please reset the session and try again",
          "error",
        );
        return;
      }

      const parsedClues = parseCluesPayload(payload);
      if (!parsedClues) {
        scannerOverlayRef.current?.setStatus(
          "Unrecognized data format. Please reset the session and try again",
          "error",
        );
        return;
      }

      mergeClues(parsedClues);
      scannerOverlayRef.current?.setStatus(
        "Data transfer complete. All clues imported",
      );
    } catch (error) {
      if (session.current.transferId !== activeSession.transferId) {
        return;
      }

      console.error("Unexpected import error:", error);
      scannerOverlayRef.current?.setStatus(
        "An unexpected error occurred. Please reset the session and try again",
        "error",
      );
    } finally {
      if (session.current.transferId !== activeSession.transferId) {
        return;
      }

      hasFinishedImport.current = true;
      isImporting.current = false;
    }
  };

  const barcodeOutput = useBarcodeScannerOutput({
    barcodeFormats: ["qr-code"],
    onBarcodeScanned: (barcodes) => {
      const barcode = barcodes[0];
      if (barcode) {
        processCode(barcode);
      }
    },
    onError: (error) => {
      console.error("Error detecting barcodes:", error);
    },
  });

  return (
    <View style={StyleSheet.absoluteFill}>
      {appState === "active" && device && (
        <Camera
          style={StyleSheet.absoluteFill}
          isActive={isFocused}
          device={device}
          outputs={[barcodeOutput]}
          enableNativeTapToFocusGesture
          enableNativeZoomGesture
        />
      )}
      <ScannerOverlay ref={scannerOverlayRef} onResetPress={resetSession} />
    </View>
  );
}
