import React from "react";
import { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Pressable,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

//import pages
import CommunicationController from "../../../utilities/CommunicationController";
import Model from "../../../utilities/Model";
import NewPost from "./Post/NewPost";
import Post from "./Post/Post";
import Map from "../Map/Map";

//import function allert
import { alertNoConnection } from "../../../utilities/functionAlertNoConncetion";

//import components
import { COLORS } from "../../../utilities/styles/MyColors";
import { STYLES } from "../../../utilities/styles/MyStyles";

/** NOTE
 * pagina 0: pagina dei post
 * pagina 1: pagina per aggiungere nuovo post
 * pagina 2: pagina mappa
 */

//TODO
/*
[ ] quando tolgo internet e cambio la tratta, il nome della tratta cambia (quando dovrebbe rimanere lo stesso)
[ ] mettere una schermata di saluto del tipo "benvenuto in tre est" --> alert
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
    img: "",
  };

  componentDidMount() {
    this.downloadPosts(this.state.sid, Model.Did); //download dei post quando crea la prima volta il componente
  }

  componentDidUpdate() {
    if (this.state.did != Model.Did) {
      console.log("aggiornare pagina perchè did diverso");
      this.resetPage();
    }

    if (this.state.img != Model.UserImg) {
      console.log("---> aggiornare pagina perchè img diverso");
      this.resetPage();
    }
  }

  render() {
    switch (this.state.page) {
      case 0:
        return this.renderBacheca();
      case 1:
        return this.renderNewPost();
      case 2:
        return this.renderMap();
    }
  }

  /* FUNZIONI DI RENDER */

  resetPage() {
    console.log("reset");
    this.setState({ did: Model.Did });
    this.setState({ img: Model.UserImg });
    this.downloadPosts(this.state.sid, Model.Did);
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
            extraData={this.state}
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
        <StatusBar backgroundColor={COLORS.primaryColor} />
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
        <StatusBar backgroundColor={COLORS.primaryColor} />
        <Map onSelect={this.goBack}></Map>
      </View>
    );
  }

  renderPost = (post) => (
    <View>
      <Post data={post} onPress={this.reDownloadAfterFollow} />
    </View>
  );

  //ALTRE FUNZIONI

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
        this.state.page = 0; //solo dopo aver scaricato i post ricarico la pagina
        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  }

  reDownloadAfterFollow = () => {
    this.downloadPosts(this.state.sid, Model.Did);
  };

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

        this.setState(this.state);
        this.resetPage();
      } else if (Model.Did == line.terminus2.did) {
        Model.Did = line.terminus1.did;
        Model.LineSelected = line.terminus1.sname;

        this.setState(this.state);
        this.resetPage();
      }
    });
  };
}

export default Bacheca;
