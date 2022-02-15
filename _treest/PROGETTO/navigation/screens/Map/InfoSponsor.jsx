import React from "react";
import { Component } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

//style
import { STYLES } from "../../../utilities/styles/MyStyles";
import { COLORS } from "../../../utilities/styles/MyColors";
import Model from "../../../utilities/Model";
import Ionicons from "react-native-vector-icons/Ionicons";

class InfoSponsor extends Component {
  componentDidMount() {
    //console.log(Model.SponsorSelected[1]);
    console.log(
      "esamefebbraio: tap su pin [" +
        this.props.sponsor[1].name +
        "]" +
        " con messaggio pubblicitario [" +
        this.props.sponsor[1].text +
        "]"
    );
  }
  render() {
    return (
      <View style={STYLES.container}>
        <Image
          source={{
            uri: "data:image/png;base64," + this.props.sponsor[1].image,
          }}
          style={STYLES.imgOffPost}
          resizeMode="contain"
        />
        <View style={STYLES.viewOffPostSelected}>
          <Text style={STYLES.title}>Informazioni sullo sponsor</Text>
          <Text style={STYLES.titleNewPost}>{this.props.sponsor[1].name}</Text>
        </View>
        <View style={STYLES.viewInfoOffPost}>
          <Text style={{ textAlign: "center" }}>SITO WEB</Text>
          <Text style={STYLES.captionOffPost}>{this.props.sponsor[1].url}</Text>
          <Text style={{ textAlign: "center" , fontWeight: "bold"}}>
            {"\n"}
            {this.props.sponsor[1].text}
          </Text>
        </View>

        <View style={STYLES.viewBackBtnOffPost}>
          <TouchableOpacity
            style={STYLES.floatingButtonBackOffPost}
            onPress={() => this.props.onSelect()}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={COLORS.white}
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default InfoSponsor;
