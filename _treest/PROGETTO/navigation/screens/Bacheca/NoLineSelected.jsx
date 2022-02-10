import React from "react";
import { Component } from "react";
import { SafeAreaView, Text, Image } from "react-native";
import { COLORS } from "../../../utilities/styles/MyColors";

import { STYLES } from "../../../utilities/styles/MyStyles";

class NoLineSelected extends Component {
  render() {
    return (
      <SafeAreaView style={STYLES.containerNoLine}>
         <Image
            source={require("../../../public/stop.png")}
            style={STYLES.imgOfficers}
            resizeMode="contain"
          />
        <Text style = {STYLES.alerNoLine}> Seleziona una linea per visualizzare i post</Text>
      </SafeAreaView>
    );
  }
}

export default NoLineSelected;
