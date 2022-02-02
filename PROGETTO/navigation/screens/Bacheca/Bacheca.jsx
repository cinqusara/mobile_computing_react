/*TODO inserire 
- una recycle view per i post
- il bottone per visualizzare la mappa
- il bottone per cambiare direzione
*/

import React from "react";
import { Component } from "react";
import { FlatList, StyleSheet, Text, View, StatusBar } from "react-native";
import { COLORS } from "../../../utilities/MyColors";

//import pages
import CommunicationController from "../../../utilities/CommunicationController";
import Storage from "../../../utilities/Storage";

//import components
import Post from "./Post";

class Bacheca extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    did: this.props.route.params.did,
    posts: this.props.route.params.posts,
  };

  componentDidMount() {
    console.log(this.state.posts);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primaryColor} />
        <Text> title </Text>
        <FlatList
          data={this.state.posts}
          renderItem={this.renderPost}
          keyExtractor={(data) => data.datetime}
        />
      </View>
    );
  }

  renderPost = (post) => (
    <View>
      <Post data={post} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  textBold: {
    fontWeight: "bold",
  },
});

export default Bacheca;
