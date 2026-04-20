import { colors } from "@/constants";
import { RefObject, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ActionButton from "./ActionButton";
import Typography from "./Typography";

const INITIAL_STATUS = "Scanning for codes...";

export type ScannerOverlayHandle = {
  setReceivedChunks: (count: number) => void;
  setTotalChunks: (count: number) => void;
  setStatus: (text: string, type?: "info" | "error") => void;
  reset: () => void;
};

type ScannerOverlayProps = {
  ref?: RefObject<ScannerOverlayHandle | null>;
  onResetPress: () => void;
};

export default function ScannerOverlay({
  ref,
  onResetPress,
}: ScannerOverlayProps) {
  const insets = useSafeAreaInsets();
  const [receivedChunks, setReceivedChunks] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);
  const [status, setStatus] = useState<{
    text: string;
    type: "info" | "error";
  }>({ text: INITIAL_STATUS, type: "info" });

  const reset = () => {
    setReceivedChunks(0);
    setTotalChunks(0);
    setStatus({ text: INITIAL_STATUS, type: "info" });
  };

  useImperativeHandle(
    ref,
    () => ({
      setReceivedChunks: (count: number) => setReceivedChunks(count),
      setTotalChunks: (count: number) => setTotalChunks(count),
      setStatus: (text: string, type?: "info" | "error") =>
        setStatus({ text, type: type || "info" }),
      reset,
    }),
    [],
  );

  const handleResetPress = () => {
    reset();
    onResetPress();
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        },
      ]}
    >
      <View style={styles.statusContainer}>
        {totalChunks > 0 && (
          <Typography
            color={colors.onSurface}
            fontSize={16}
            lineHeight={24}
            fontWeight="semibold"
            textAlign="center"
          >
            {receivedChunks} / {totalChunks} codes scanned
          </Typography>
        )}
        <Typography
          color={status.type === "error" ? colors.danger : colors.onSurface}
          fontSize={16}
          lineHeight={24}
          textAlign="center"
        >
          {status.text}
        </Typography>
      </View>
      <ActionButton
        title="Reset session"
        iconName="refresh"
        onPress={handleResetPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 24,
    gap: 16,
    backgroundColor: colors.scannerOverlayBackground,
  },
  statusContainer: {
    gap: 4,
  },
});
