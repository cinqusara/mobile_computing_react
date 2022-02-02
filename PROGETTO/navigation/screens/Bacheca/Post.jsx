import { StatusBar } from "expo-status-bar";
import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { COLORS } from "../../../utilities/MyColors";

class Post extends Component {
  state = {
    post: this.props.data.item,
  };

  render() {
    return (
      <View style={styles.boxPost}>
        <Text>author</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    margin: 10,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
  },
  title: {
    fontWeight: "bold",
  },
  boxPost: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "azure",
    margin: 10,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
  },
});

export default Post;
