//import elementi
import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View, StatusBar } from "react-native";
import { COLORS } from "../../../utilities/MyColors";

//import pages
import CommunicationController from "../../../utilities/CommunicationController";
import Storage from "../../../utilities/Storage";

//import Component
import Line from "./Line";

class Tratte extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    lines: this.props.route.params.lines,
    didArrivalStation: "",
    arrivalStation: "",
    goBackToBacheca: this.props.navigation.goBack, //valore già presente nel navigation
  };

  // componentDidMount() {
  //   //console.log(this.props);
  //   this.getLines(this.state.sid);
  // }

  render() {
    if (this.state.lines != null) {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor={COLORS.primaryColor} />
          <FlatList
            data={this.state.lines}
            renderItem={this.renderLine}
            keyExtractor={(data) => data.terminus1.did}
          ></FlatList>
        </View>
      );
    } else {
      return null;
    }
  }

  renderLine = (line) => (
    <View>
      <Line data={line} onSelect={this.handleSelect} />
    </View>
  );

  handleSelect = (didArrivalStation, arrivalStation) => {
    console.log("Select " + didArrivalStation + " -> " + arrivalStation);
    this.setState({ didArrivalStation: didArrivalStation });
    this.setState({ arrivalStation: arrivalStation });
    //[x] andare sulla pagina bacheca
    //[ ] fare in modo che quando si torna indietro venga fatta una chiamata per recuperare i post
    //    [x] possiamo salvare il did in maniera persistente
    //    [ ] possiamo salvare il did nello stato del Main Container tramite la funzione set params del navigator
    this.state.goBackToBacheca();
    Storage.saveDid(didArrivalStation);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBold: {
    fontWeight: "bold",
  },
});

export default Tratte;
