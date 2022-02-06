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
import { STYLES } from "../../../utilities/MyStyles";

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
    this.downloadPosts(); //download dei post quando crea la prima volta il componente
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
    console.log("reset");
    this.setState({ did: Model.Did });
    this.setState({ page: 0 });
    this.downloadPosts();
    return null;
  }

  renderBacheca() {
    return (
      <View style={STYLES.container}>
        <StatusBar backgroundColor={COLORS.primaryColor} />

        <View>
          <View style={STYLES.containerTopElementBacheca}>
            <Text style={STYLES.titleLineSelected}>
              {this.getLineSelected()}
            </Text>
            <View style={STYLES.topButtonBacheca}>
              <Pressable
                onPress={() => this.changeDirection()}
                style={STYLES.iconBacheca}
              >
                <Ionicons
                  name="repeat-outline"
                  size={20}
                  color={COLORS.primaryColor}
                />
              </Pressable>
            </View>
            <View style={STYLES.topButtonBacheca}>
              <Pressable
                onPress={() => this.goToMap()}
                style={STYLES.iconBacheca}
              >
                <Ionicons
                  name="navigate"
                  size={20}
                  color={COLORS.primaryColor}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={STYLES.containerFlatList}>
          <FlatList
            data={this.state.posts}
            renderItem={this.renderPost}
            keyExtractor={(data) => data.datetime}
          />
        </View>
        <View>
          <TouchableOpacity
            style={STYLES.floatingButtonAddPost}
            onPress={() => this.goToNewPost()}
          >
            <Ionicons
              name="add-outline"
              size={30}
              color={COLORS.white}
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderNewPost() {
    return (
      <View>
        <NewPost
          onSelect={this.goBack}
          onPress={this.goBackFromNewPost}
        ></NewPost>
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
      <Post data={post} onPress={this.downloadPosts} />
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

  //TODO qui mi da errore quando, settando il follow, rifaccio il download dei post
  downloadPosts() {
    console.log("download post");
    console.log("sid " + this.state.sid + " did " + Model.Did);
    CommunicationController.getPosts( this.props.route.params.sid, Model.Did)
      .then((result) => {
        // console.log(result)
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
    this.resetPage();
  };

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

export default Bacheca;
