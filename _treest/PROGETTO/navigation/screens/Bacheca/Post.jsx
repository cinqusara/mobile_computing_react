import { StatusBar } from "expo-status-bar";
import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View, Button } from "react-native";
import { COLORS } from "../../../utilities/MyColors";
import {STYLES}  from "../../../utilities/MyStyles";
import { Avatar, Title, Caption, TouchableRipple } from "react-native-paper";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";

class Post extends Component {
  state = {
    post: this.props.data.item,
    uriImg:
      "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
  };

  render() {
    /*
    [x] convertire date time
    [x] convertire status e delay con delle parole
    [ ] sistemare layout post
    [ ] inserire immagine
    */

    return (
      <View style={styles.boxPost}>
        <View style={STYLES.innerContainer}>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri: this.state.uriImg,
              }}
              size={80}
            />
            <Text style={styles.dateTime}>
              {this.convertDate()}
              {"\n"}
              {this.convertTime()}
            </Text>
          </View>

          <View>
            <Text>
              <Text style={styles.title}>{this.state.post.authorName}</Text>
              {"\n"} {"\n"}
              Delay: {this.convertDelay()}
              {"\n"}
              Status: {this.convertStatus()}
              {"\n"} {"\n"}
              Comment:{this.state.post.comment}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  convertDate() {
    let fullDateTime = this.state.post.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let dateString = arrayDateTime[0];

    return dateString;
  }

  convertTime() {
    let fullDateTime = this.state.post.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let timeString = arrayDateTime[1];

    return timeString.slice(0, 5);
  }

  convertStatus() {
    switch (this.state.post.status) {
      case 0:
        return "In orario";
      case 1:
        return "Ritardo di pochi minuti";
      case 2:
        return "Ritardo oltre i 15 minuti";
      case 3:
        return "Treni soppressi";
      default:
        return "Nessuna informazione";
    }
  }

  convertDelay() {
    switch (this.state.post.delay) {
      case 0:
        return "Situazione ideale";
      case 1:
        return "Situazione accettabile";
      case 2:
        return "Gravi problemi per \ni passeggeri";
      default:
        return "Nessuna informazione";
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightGrey,
    margin: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
  },
 
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  boxPost: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLORS.lightColor,
    marginTop: 10,
    padding: 3,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.darkColor,
  },
  userInfoSection: {
    margin: 10,
    marginBottom: 25,
  },
  dateTime: {
    fontSize: 11,
    color: COLORS.darkGrey,
    textAlign: "center",
  },
});

export default Post;
