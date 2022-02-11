import React from "react";
import { Component } from "react";
import { Text, View, Button } from "react-native";
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
        <Text style={STYLES.textBoldLine}>
          {this.state.line.terminus1.sname.toUpperCase()} -{" "}
          {this.state.line.terminus2.sname.toUpperCase()}
        </Text>
        <Text></Text>
        <Button
          title={this.state.line.terminus1.sname}
          color={COLORS.primaryColor}
          onPress={() =>
            this.state.onSelect(
              this.state.line.terminus1.did,
              this.state.line.terminus1.sname
            )
          }
        />
        <Text></Text>
        <Button
          title={this.state.line.terminus2.sname}
          color={COLORS.primaryColor}
          onPress={() =>
            this.state.onSelect(
              this.state.line.terminus2.did,
              this.state.line.terminus2.sname
            )
          }
        />
      </View>
    );
  }
}

export default Line;
