//import elementi
import React from "react";
import { Component } from "react";
import { FlatList, Text, View, StatusBar, Image } from "react-native";
import { COLORS } from "../../../utilities/styles/MyColors";

//import pages
import Storage from "../../../utilities/storage/Storage";

//import Component
import Line from "./Line";
import Model from "../../../utilities/Model";
import { STYLES } from "../../../utilities/styles/MyStyles";

//const for screen
const bacheca = "Bacheca";

class Tratte extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    lines: this.props.route.params.lines,
    didArrivalStation: "",
    arrivalStation: "",
    onSelect: this.props.route.params.onSelect,
  };

  render() {
    if (this.state.lines != null) {
      return (
        <View style={STYLES.container2}>
          <StatusBar backgroundColor={COLORS.primaryColor} />
          <Image
            source={require("../../../public/trainIcon.png")}
            style={STYLES.imgTrain}
            resizeMode="contain"
          />
          <View>
            <Text style={STYLES.title}>Tre Est In Viaggio</Text>
          </View>
          <FlatList
            data={this.state.lines}
            extraData={this.state}
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
    console.log("Select " + didArrivalStation + " --> " + arrivalStation);
    this.setState({ didArrivalStation: didArrivalStation });
    Storage.saveDid(didArrivalStation);
    Model.Did = didArrivalStation;
    Model.LineSelected = arrivalStation;
    
    //funzioni per andare sulla bacheca
    this.state.onSelect(didArrivalStation);
    this.state.navigation.navigate(bacheca, didArrivalStation);
  };
}

export default Tratte;
