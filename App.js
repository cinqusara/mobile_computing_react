import React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainContainer from "./PROGETTO/navigation/MainContainer";

//import asycn storage
import AsyncStorage from "@react-native-async-storage/async-storage";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return <MainContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
