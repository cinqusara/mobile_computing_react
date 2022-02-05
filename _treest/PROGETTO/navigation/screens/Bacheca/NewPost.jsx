import React from "react";
import { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Button,
  TouchableOpacity,
  Picker,
} from "react-native";
import { COLORS } from "../../../utilities/MyColors";
import { STYLES } from "../../../utilities/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, TextInput } from "react-native-paper";

//import pages
import CommunicationController from "../../../utilities/CommunicationController";
import Storage from "../../../utilities/Storage";
import Model from "../../../utilities/Model";

//import components
import Post from "./Post";

/* TODO
[ ] sistemare le dimensioni delle view
[ ] sistemare layout per il titolo
*/

class NewPost extends Component {
  state = {
    stateChecked: "",
    delayChecked: "",
    comment: "",
  };

  render() {
    return (
      <View style={STYLES.container}>
        {this.renderTitle()}
        <View style={STYLES.innerContainer}>
          {this.renderStatus()}
          {this.renderDelay()}
        </View>
       {this.renderComment()}
       {this.renderBackBtn()}
      </View>
    );
  }

  renderBackBtn = () => {
    return (
      <View style={STYLES.bottomViewNewPost}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => this.props.onSelect()}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderTitle = () => {
    return (
      <View style={STYLES.titleViewNewPost}>
        <Text style={STYLES.title}>
          CREA NUOVO POST{"\n"}
          {Model.LineSelected}
        </Text>
      </View>
    );
  };

  renderStatus = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.caption}>STATO</Text>
        <RadioButton.Group
          onValueChange={(value) => this.setStatusChecked(value)}
          value={this.state.stateChecked}
        >
          <RadioButton.Item
            label="Situazione ideale"
            value="0"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Situazione accettabile"
            value="1"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Gravi problemi"
            value="2"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
        </RadioButton.Group>
      </View>
    );
  };

  renderDelay = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.caption}>RITARDO</Text>
        <RadioButton.Group
          onValueChange={(value) => this.setDelayChecked(value)}
          value={this.state.delayChecked}
        >
          <RadioButton.Item
            label="In orario"
            value="0"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Ritardo di pochi minuti"
            value="1"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Ritardo oltre i 15 minuti"
            value="2"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Treni soppressi"
            value="3"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
        </RadioButton.Group>
      </View>
    );
  };

  setStatusChecked = (radio) => {
    this.state.stateChecked = radio;
    this.setState(this.state);
  };

  setDelayChecked = (radio) => {
    this.state.delayChecked = radio;
    this.setState(this.state);
  };

  renderComment = () => {
    return (
      <View style={STYLES.viewComment}>
        <TextInput
          label="Commento"
          value={this.state.comment}
          onChangeText={(text) => this.setComment(text)}
          mode="outlined"
          multiline={true}
          activeOutlineColor={COLORS.primaryColor}
        />
      </View>
    );
  };

  setComment = () => {};
}

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 60,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
  },
});
export default NewPost;
