/*TODO inserire 
[x] una recycle view per i post
[ ] il bottone per visualizzare la mappa
[ ] il bottone per cambiare direzione
[ ] sistemare il titolo
*/

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
  SafeAreaView,
  Pressable,
} from "react-native";
import { COLORS } from "../../../utilities/MyColors";
import Ionicons from "react-native-vector-icons/Ionicons";

//import pages
import CommunicationController from "../../../utilities/CommunicationController";
import Storage from "../../../utilities/Storage";
import Model from "../../../utilities/Model";
import NewPost from "./NewPost";
import Map from "../Map/Map";

//import components
import Post from "./Post";

/** NOTE
 * pagina 0: pagina dei post
 * pagina 1: pagina per aggiungere nuovo post
 * pagina 2: pagina mappa
 */

class Bacheca extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    lines: this.props.route.params.lines,
    did: Model.Did,
    posts: "",
    page: 0,
  };

  componentDidMount() {
    this.downloadPosts(this.state.sid, this.state.did); //download dei post quando crea la prima volta il componente
  }

  render() {
    if (this.state.did == Model.Did) {
      switch (this.state.page) {
        case 0:
          return this.renderBacheca();
        case 1:
          return this.renderNewPost();
        case 2:
          return this.renderMap();
      }
    } else {
      //se il did del model è cambiato, gli faccio rifare il dowload dei post
      this.setState({ did: Model.Did });
      this.setState({ page: 0 });
      this.downloadPosts(this.state.sid, this.state.did);
      return null;
    }
  }

  /* FUNZIONI DI RENDER */

  renderBacheca() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.primaryColor} />

        <View>
          <View style={styles.containerTopElement}>
            <Text style={styles.title}>{this.getLineSelected()}</Text>
            <View style={styles.topButton}>
              <Pressable
                onPress={() => this.changeDirection()}
                style={styles.icon}
              >
                <Ionicons
                  name="repeat-outline"
                  size={20}
                  color={COLORS.primaryColor}
                />
              </Pressable>
            </View>
            <View style={styles.topButton}>
              <Pressable onPress={() => this.goToMap()} style={styles.icon}>
                <Ionicons
                  name="navigate"
                  size={20}
                  color={COLORS.primaryColor}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.containerFlatList}>
          <FlatList
            data={this.state.posts}
            renderItem={this.renderPost}
            keyExtractor={(data) => data.datetime}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => this.goToNewPost()}
          >
            <Ionicons name="add-outline" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderNewPost() {
    return (
      <View>
        <NewPost onSelect={this.goBack}></NewPost>
      </View>
    );
  }

  renderMap() {
    return (
      <View>
        <Map onSelect={this.goBack}></Map>
      </View>
    );
  }

  /** ALTRE FUNZIONI */

  getLineSelected = () => {
    if (Model.LineSelected == "" || Model.LineSelected == undefined) {
      //caso in cui siamo siamo nel secondo avvio e il model non ha la linea selezionata
      for (let index = 0; index < this.state.lines.length; index++) {
        const line = this.state.lines[index];
        if (line.terminus1.did == Model.Did) {
          return line.terminus1.sname.toUpperCase();
        } else if (line.terminus2.did == Model.Did) {
          return line.terminus2.sname.toUpperCase();
        }
      }
    } else {
      return Model.LineSelected.toUpperCase();
    }
  };

  renderPost = (post) => (
    <View>
      <Post data={post} />
    </View>
  );

  downloadPosts(sid, did) {
    CommunicationController.getPosts(sid, did)
      .then((result) => {
        this.state.posts = result.posts;
        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  }

  goToNewPost = () => {
    console.log("addNewPost");
    this.setState({ page: 1 });
  };

  goBack = () => {
    console.log("goBack");
    this.setState({ page: 0 });
  };

  changeDirection = () => {};

  goToMap = () => {
    console.log("goToMap");
    this.setState({ page: 2 });
  };
}

/* STILE */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  textBold: {
    fontWeight: "bold",
  },

  floatingButton: {
    position: "absolute",
    width: 50,
    height: 50,
    bottom: 60,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
    right: -170,
    elevation: 5,
  },

  topButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    color: COLORS.darkColor,
  },

  title: {
    fontWeight: "bold",
    color: COLORS.white,
    textAlignVertical: "center",
  },

  containerTopElement: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    backgroundColor: COLORS.primaryColor,
    width: "100%",
  },

  topButton: {
    backgroundColor: COLORS.white,
    borderRadius: 40,
  },

  icon: {
    padding: 14,
  },

  containerFlatList: {
    width: "90%",
  },
});

export default Bacheca;
