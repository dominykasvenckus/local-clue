import { Typography } from "@/components";
import { StyleSheet, View } from "react-native";

export default function Add() {
  return (
    <View style={styles.container}>
      <Typography>Add clue</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
