import React from "react";
import { Component } from "react";
import {Text, View, Button } from "react-native";
import { COLORS } from "../../../utilities/styles/MyColors";
import { STYLES } from "../../../utilities/styles/MyStyles";

class Line extends Component {
  state = {
    line: this.props.data.item,
    onSelect: this.props.onSelect,
  };

  render() {
    return (
      <View style={STYLES.containerLine}>
        <Text style={STYLES.textBold}>
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

export default Line;
