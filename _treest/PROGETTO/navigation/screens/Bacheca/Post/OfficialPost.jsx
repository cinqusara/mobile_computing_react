import React from "react";
import { Component } from "react";

import { Text, View, Image, TouchableOpacity } from "react-native";

//style
import { COLORS } from "../../../../utilities/styles/MyColors";
import { STYLES } from "../../../../utilities/styles/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, FAB } from "react-native-paper";

//component
import CommunicationController from "../../../../utilities/CommunicationController";
import Model from "../../../../utilities/Model";
import StorageManager from "../../../../utilities/storage/StorageManager";

//import alert no connection
import { alertNoConnection } from "../../../../utilities/functionAlertNoConncetion";

class OfficialPost extends Component {
  render() {
    return (
      <View style={STYLES.container}>
        <Image
          source={require("../../../../public/trainIcon.png")}
          style={STYLES.imgOffPost}
          resizeMode="contain"
        />
        <View style={STYLES.viewOffPostSelected}>
          <Text style={STYLES.title}>Informazioni sulla tratta</Text>
          <Text style={STYLES.titleNewPost}>{Model.LineSelected}</Text>
        </View>
        <View style={STYLES.viewInfoOffPost}>
          <Text style={STYLES.textBoldOffPost}>
            {this.props.offPostSelected.title}
          </Text>
          <Text style={STYLES.captionOffPost}>
            {this.convertDate(this.props.offPostSelected.timestamp)} --{" "}
            {this.convertTime(this.props.offPostSelected.timestamp)}
          </Text>

          <Text style={{ textAlign: "center" }}>
            {"\n"}
            {this.props.offPostSelected.description}
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

  convertDate(fullDateTime) {
    const arrayDateTime = fullDateTime.split(" ");
    let dateString = arrayDateTime[0];

    return dateString;
  }

  convertTime(fullDateTime) {
    const arrayDateTime = fullDateTime.split(" ");
    let timeString = arrayDateTime[1];

    return timeString.slice(0, 5);
  }
}
export default OfficialPost;
