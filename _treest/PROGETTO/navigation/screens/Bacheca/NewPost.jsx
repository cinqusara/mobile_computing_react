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
import { RadioButton } from "react-native-paper";

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
    checked: "first",
    data: [
      {
        value: "Banana",
      },
      {
        value: "Mango",
      },
      {
        value: "Pear",
      },
    ],
  };

  render() {
    return <View style={STYLES.container}>{this.renderRadioButton()}</View>;
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
      <View>
        <Text style={STYLES.title}>
          CREA NUOVO POST {"\n"} {Model.LineSelected}
        </Text>
      </View>
    );
  };

  renderRadioButton = () => {
    return (
      <View>
        <RadioButton.Group
          onValueChange={(value) => this.setChecked(value)}
          value={this.state.checked}
        >
          <RadioButton.Item label="First item" value="first" />
          <RadioButton.Item label="Second item" value="second" />
        </RadioButton.Group>
      </View>
    );
  };

  setChecked = (radio) => {
    this.state.checked = radio;
    this.setState(this.state);
  };

  changeCountry(item) {
    let city = null;
    let cities;
    switch (item.value) {
      case "fr":
        cities = [{ label: "Paris", value: "paris" }];
        break;
      case "es":
        cities = [{ label: "Madrid", value: "madrid" }];
        break;
    }

    this.setState({
      city,
      cities,
    });
  }
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
