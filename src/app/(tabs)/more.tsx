import { Typography } from "@/components";
import { StyleSheet, View } from "react-native";

export default function More() {
  return (
    <View style={styles.container}>
      <Typography>More screen</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
