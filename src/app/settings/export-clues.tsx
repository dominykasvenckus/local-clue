import { ActionButton, Typography } from "@/components";
import { colors } from "@/constants";
import { prepareTransferFrames } from "@/lib";
import { useCluesStore } from "@/storage/stores";
import { PreparedTransfer } from "@/types";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const emptyTransfer: PreparedTransfer = {
  transferId: "",
  checksum: "",
  totalChunks: 0,
  frames: [],
};

export default function ExportClues() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const clues = useCluesStore((state) => state.clues);
  const [transfer, setTransfer] = useState<PreparedTransfer>(emptyTransfer);
  const [activeChunkIndex, setActiveChunkIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentFrame = transfer.frames[activeChunkIndex];
  const qrSize = Math.min(width - (insets.left + insets.right + 48), 320);
  const visibleChunkNumber = transfer.totalChunks ? activeChunkIndex + 1 : 0;
  const canNavigateChunks = transfer.totalChunks > 1;

  useEffect(() => {
    if (!clues.length) {
      setTransfer(emptyTransfer);
      setError(null);
      setIsLoading(false);
      return;
    }

    let isCancelled = false;

    (async () => {
      try {
        const transfer = await prepareTransferFrames(clues);
        if (!isCancelled) {
          setTransfer(transfer);
          setError(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Error preparing transfer frames:", error);
          setTransfer(emptyTransfer);
          setError("An error occurred while generating the codes");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [clues]);

  useEffect(() => {
    if (!isPlaying || transfer.totalChunks <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActiveChunkIndex((previous) => (previous + 1) % transfer.totalChunks);
    }, 850);

    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, transfer.totalChunks]);

  const handleChunkChange = (direction: "next" | "previous") => {
    if (!transfer.totalChunks) {
      return;
    }
    setActiveChunkIndex((prev) => {
      return direction === "next"
        ? (prev + 1) % transfer.totalChunks
        : (prev - 1 + transfer.totalChunks) % transfer.totalChunks;
    });
  };

  const QrContent = (() => {
    if (isLoading) {
      return <View style={{ width: qrSize, minHeight: qrSize }} />;
    }

    if (currentFrame) {
      return <QRCode value={currentFrame} size={qrSize} />;
    } else {
      return (
        <View
          style={[
            styles.qrPlaceholder,
            {
              width: qrSize,
              minHeight: qrSize,
              borderColor: error ? colors.danger : colors.borderSubtle,
            },
          ]}
        >
          <Typography
            color={error ? colors.danger : colors.onSurfaceSubtle}
            fontSize={16}
            lineHeight={24}
            textAlign="center"
          >
            {error || "Add at least one clue to start exporting"}
          </Typography>
        </View>
      );
    }
  })();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          paddingTop: 24,
          paddingBottom: insets.bottom + 24,
          paddingLeft: insets.left + 24,
          paddingRight: insets.right + 24,
        },
      ]}
    >
      <Typography color={colors.onSurfaceSubtle} fontSize={16} lineHeight={24}>
        Press{" "}
        <Typography
          color={colors.onSurfaceSubtle}
          fontSize={16}
          lineHeight={24}
          fontWeight="bold"
        >
          Start
        </Typography>{" "}
        and point your other device at the screen until the sequence finishes
        playing
      </Typography>
      <View style={styles.qrGroupContainer}>
        <View style={styles.qrContainer}>{QrContent}</View>
        <Typography
          color={colors.onSurface}
          fontSize={16}
          lineHeight={24}
          fontWeight="semibold"
          textAlign="center"
          style={isLoading && styles.hiddenContent}
        >
          {error
            ? "Code -/-"
            : `Code ${visibleChunkNumber}/${transfer.totalChunks}`}
        </Typography>
      </View>
      <View style={styles.actionsContainer}>
        <ActionButton
          variant="solid"
          title={isPlaying ? "Pause" : "Start"}
          onPress={() => setIsPlaying((previous) => !previous)}
          disabled={!canNavigateChunks}
        />
        <ActionButton
          title="Previous code"
          iconName="arrow-left"
          onPress={() => handleChunkChange("previous")}
          disabled={!canNavigateChunks}
        />
        <ActionButton
          title="Next code"
          iconName="arrow-right"
          onPress={() => handleChunkChange("next")}
          disabled={!canNavigateChunks}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    gap: 24,
  },
  qrGroupContainer: {
    gap: 16,
  },
  hiddenContent: {
    opacity: 0,
  },
  qrContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  qrPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    borderWidth: 1,
  },
  actionsContainer: {
    gap: 12,
  },
});
