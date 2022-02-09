import React, { useState } from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./PROGETTO/navigation/MainContainer";
import { checkConnected } from "./PROGETTO/utilities/CheckConnection";
import NoConnectionScreen from "./PROGETTO/navigation/screens/NoConnectionScreen";

export default function App() {
  const [connectStatus, setConnectStatus] = useState(false);
  checkConnected().then((res) => {
    console.log(res);
    setConnectStatus(res);
    /* per far partire l'applicazione serve sempre internet quindi questa funzione
    all'avvio non serve a molto, ma se mettessimo setConnectStatus(false) mostrerebbe
    l'icona di no internet */
  });
  return connectStatus ? <MainContainer /> : <NoConnectionScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
