import { StatusBar } from "expo-status-bar";
import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../../utilities/MyColors";
import { STYLES } from "../../../../utilities/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, FAB } from "react-native-paper";
import CommunicationController from "../../../../utilities/CommunicationController";
import Model from "../../../../utilities/Model";

class Post extends Component {
  state = {
    post: this.props.data.item,
    uriImg:
      "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    /*
   
    [ ] sistemare layout post
    [ ] inserire immagine
    [ ] eliminare gli a capo dal post 
    [ ] bottone follow/unfollow
    */

    return (
      <View style={STYLES.boxPost}>
        <View style={STYLES.innerContainer}>
          <View style={STYLES.userInfoSection}>
            <Avatar.Image
              source={{
                uri: this.state.uriImg,
              }}
              size={80}
            />
            <FAB
              style={STYLES.fabPost}
              small
              icon={() => (
                <Ionicons
                  name={this.setIcon()}
                  size={25}
                  color={COLORS.white}
                  style={STYLES.iconPost}
                />
              )}
              onPress={() => this.setFollowUnfollow()}
            />
          </View>

          <View style={STYLES.infoLine}>
            <Text>
              <Text style={STYLES.title}>{this.state.post.authorName}</Text>
              {"\n"}
              <Text style={STYLES.dateTime}>
                {this.convertDate()} -- {this.convertTime()}
              </Text>
              {"\n"} {"\n"}
              <Text style={STYLES.textBold}>Ritardo</Text> {this.convertDelay()}
              {"\n"}
              <Text style={STYLES.textBold}>Stato</Text> {this.convertStatus()}
              {"\n"}
            </Text>
            <View style={STYLES.commentPost}>
              <Text style={STYLES.textComment}>{this.state.post.comment}</Text>
            </View>
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
        return "Gravi problemi";
      default:
        return "Nessuna informazione";
    }
  }

  setIcon = () => {
    if (this.state.post.followingAuthor == false) {
      return "add-circle";
    } else {
      return "checkmark-outline";
    }
  };

  setFollowUnfollow = () => {
    if (this.state.post.followingAuthor == false) {
      //inizia a seguire l'utente
      this.setFollow();
    } else {
      //smette di seguire l'utente
      this.setUnfollow();
    }
  };

  setFollow = () => {
    CommunicationController.follow(Model.Sid, this.state.post.author)
      .then((result) => {
        console.log("settato follow");
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  };

  setUnfollow = () => {
    CommunicationController.unfollow(Model.Sid, this.state.post.author)
      .then((result) => {
        console.log("settato unfollow");
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  };
}

export default Post;
