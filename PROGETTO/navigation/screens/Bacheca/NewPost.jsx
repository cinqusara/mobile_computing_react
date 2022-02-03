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
} from "react-native";
import { COLORS } from "../../../utilities/MyColors";
import Ionicons from "react-native-vector-icons/Ionicons";

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
  render() {
      console.log(this.props)
    return (
      <View style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.title}>new post</Text>
        </View>
        <View style={styles.middleView}>
          <Text> inserire campi nuovo post </Text>
        </View>
        <View style={styles.bottom}>
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
      </View>
    );
  }

  goBack() {}
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
  },
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
  titleView: {
    height: 30,
    marginTop: 40,
  },
  middleView: {
    height: 30,
  },
  bottom: {
    bottom: -450,
  },
});
export default NewPost;
