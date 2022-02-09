import { Alert } from "react-native";

export const alertNoConnection = () => {
  console.log("in alert no connection");
  Alert.alert("ATTENZIONE", "Si è verificato un problema. Riprova più tardi", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};
