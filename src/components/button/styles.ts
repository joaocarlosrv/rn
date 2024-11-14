import { StyleSheet } from "react-native";
import { colors } from "@/app/styles/colors";

export const styles = StyleSheet.create({
  container: {
    height: 52,
    width: "100%",
    backgroundColor: colors.green[300],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    color: colors.green[900],
    fontSize: 16,
    fontWeight: "600",
  },
})