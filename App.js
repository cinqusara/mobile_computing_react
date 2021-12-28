import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tratte from './navigation/screens/Tratte';
import Bacheca from './navigation/screens/Bacheca';
import MainContainer from './navigation/MainContainer';
import Profilo from './navigation/screens/Profilo';
import Mappa from './navigation/screens/Mappa';


class App extends Component {
  constructor() {
    super();
  }

  state = {
    primoAvvio: true,
  }

  render() {
    return (
      <MainContainer primoAvvio = {this.state.primoAvvio}/>

    )

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
