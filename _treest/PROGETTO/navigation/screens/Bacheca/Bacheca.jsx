/*TODO inserire 
[x] una recycle view per i post
[x] il bottone per visualizzare la mappa
[x] il bottone per cambiare direzione
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
import NewPost from "./Post/NewPost";
import Map from "../Map/Map";

//import components
import Post from "./Post/Post";

/** NOTE
 * pagina 0: pagina dei post
 * pagina 1: pagina per aggiungere nuovo post
 * pagina 2: pagina mappa
 * pagina 3: inversione direzione --> l'ho dovuta inserire sennò non faceva il render al cambio direzione
 */

class Bacheca extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    lines: this.props.route.params.lines,
    did: "",
    posts: "",
    page: 0,
    lineSelected: "",
  };

  componentDidMount() {
    this.downloadPosts(this.state.sid, Model.Did); //download dei post quando crea la prima volta il componente
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
        case 3:
          return this.resetPage();
      }
    } else if (this.state.did != Model.Did) {
      //quando clicco una linea dalla pagina tratte il did è diverso
      return this.resetPage();
    }
  }

  /* FUNZIONI DI RENDER */

  resetPage() {
    this.setState({ did: Model.Did });
    this.setState({ page: 0 });
    this.downloadPosts(this.state.sid, Model.Did);
    return null;
  }

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
        <NewPost onSelect={this.goBack} onPress = {this.goBackFromNewPost}></NewPost>
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

  renderPost = (post) => (
    <View>
      <Post data={post} />
    </View>
  );

  /** ALTRE FUNZIONI */

  getLineSelected = () => {
    this.findLine();
    return Model.LineSelected.toUpperCase();
  };

  findLine = () => {
    this.state.lines.forEach((line) => {
      if (line.terminus1.did == Model.Did) {
        Model.LineSelected = line.terminus1.sname;
      }
      if (line.terminus2.did == Model.Did) {
        Model.LineSelected = line.terminus2.sname;
      }
    });
  };

  //CHIAMATE DI RETE

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

  /* FUNZIONI PER CAMBIARE PAGINA */

  goToNewPost = () => {
    console.log("addNewPost");
    this.setState({ page: 1 });
  };

  goBack = () => {
    console.log("goBack");
    this.setState({ page: 0 });
  };

  goToMap = () => {
    console.log("goToMap");
    this.setState({ page: 2 });
  };

  goBackFromNewPost = () => {
    console.log("goBack from new post");
    this.resetPage()
  }

  changeDirection = () => {
    console.log("change direction");
    this.state.lines.forEach((line) => {
      if (Model.Did == line.terminus1.did) {
        Model.Did = line.terminus2.did;
        Model.LineSelected = line.terminus2.sname;
        this.state.page = 3;
        this.setState(this.state);
      } else if (Model.Did == line.terminus2.did) {
        Model.Did = line.terminus1.did;
        Model.LineSelected = line.terminus1.sname;
        this.state.page = 3;
        this.setState(this.state);
      }
    });
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
    height: 580,
    width: "90%",
  },
});

export default Bacheca;
