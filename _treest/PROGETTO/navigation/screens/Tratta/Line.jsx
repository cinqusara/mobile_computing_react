import { StatusBar } from "expo-status-bar";
import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { COLORS } from "../../../utilities/MyColors";

class Line extends Component {
  state = {
    line: this.props.data.item,
    onSelect: this.props.onSelect,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Line: {this.state.line.terminus1.sname} -{" "}
          {this.state.line.terminus2.sname}
        </Text>
        <Text>Direction: {this.state.line.terminus1.sname}</Text>
        <Button
          title="select"
          color = {COLORS.primaryColor}
          onPress={() =>
            this.state.onSelect(
              this.state.line.terminus1.did,
              this.state.line.terminus1.sname
            )
          }
        />
        <Text>Direction: {this.state.line.terminus2.sname}</Text>
        <Button
          style={styles.button}
          title="select"
          color = {COLORS.primaryColor}
          onPress={() =>
            this.state.onSelect(
              this.state.line.terminus2.did,
              this.state.line.terminus2.sname,
              //TODO salvare in maniera persistente il did
              //TODO passare alla bacheca
            )
          }
        />
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
});

export default Line;
