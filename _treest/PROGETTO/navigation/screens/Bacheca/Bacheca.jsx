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
import Storage from "../../../utilities/storage/Storage";

//import function allert
import { alertNoConnection } from "../../../utilities/functionAlertNoConncetion";

//import components
import { COLORS } from "../../../utilities/styles/MyColors";
import { STYLES } from "../../../utilities/styles/MyStyles";
import OfficialPost from "./Post/OfficialPost";

/** NOTE
 * pagina 0: pagina dei post
 * pagina 1: pagina per aggiungere nuovo post
 * pagina 2: pagina mappa
 * pagina 3: info official post
 */

class Bacheca extends Component {
  state = {
    navigation: this.props.navigation,
    sid: this.props.route.params.sid,
    lines: this.props.route.params.lines,
    did: "",
    posts: "",
    officialposts: "",
    offPostSelected: "",
    allPosts: "",
    page: 0,
    lineSelected: "",
    img: "",
    authorName: "",
  };

  componentDidMount() {
    this.downloadOfficialPost(Model.Did);
  }

  componentDidUpdate() {
    if (
      this.state.did != Model.Did ||
      this.state.img != Model.UserImg ||
      this.state.authorName != Model.AuthorName
    ) {
      console.log("aggiornare pagina perchè did o dati profilo aggiornati");
      this.resetPage();
    }
  }

  render() {
    //console.log("----------------")
    //console.log(this.props.route.params.sponsors)
    switch (this.state.page) {
      case 0:
        return this.renderBacheca();
      case 1:
        return this.renderNewPost();
      case 2:
        return this.renderMap();
      case 3:
        return this.renderOffPosts();
    }
  }

  //FUNZIONE DI RESET PAGINA --> RIPRISTINA I DATI E CI PORTA SULLA BACHECA
  resetPage() {
    this.state.did = Model.Did;
    this.state.img = Model.UserImg;
    this.state.authorName = Model.AuthorName;
    this.setState(this.state);
    this.downloadOfficialPost(Model.Did);
  }

  //FUNZIONI DI RENDER

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
            data={this.state.allPosts}
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
        <Map
          onSelect={this.goBack}
          sponsors={this.props.route.params.sponsors}
        ></Map>
      </View>
    );
  }

  renderPost = (post) => (
    <View>
      <Post
        data={post}
        onPress={this.reDownloadAfterFollow}
        onSelect={this.goToOffPost}
      />
    </View>
  );

  renderOffPosts = () => {
    return (
      <View>
        <StatusBar backgroundColor={COLORS.primaryColor} />
        <OfficialPost
          onSelect={this.goBack}
          offPostSelected={this.state.offPostSelected}
        ></OfficialPost>
      </View>
    );
  };

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

  //FIXME CHIAMATA DI RETE ESAME GENNAIO
  downloadOfficialPost(did) {
    CommunicationController.statoLineaTreEst(did)
      .then((result) => {
        // console.log(result);
        this.state.officialposts = result.officialposts;
        this.setState(this.state);
        this.downloadPosts(this.state.sid, Model.Did);
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  }

  //CHIAMATE DI RETE
  downloadPosts(sid, did) {
    CommunicationController.getPosts(sid, did)
      .then((result) => {
        this.state.posts = result.posts;

        let allPosts = [];
        this.state.officialposts.forEach((offPost) => {
          allPosts.push(offPost);
        });

        result.posts.forEach((post) => {
          allPosts.push(post);
        });

        this.state.allPosts = allPosts;
        // console.log(allPosts);

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
    this.setState({ page: 1 });
  };

  goBack = () => {
    this.setState({ page: 0 });
  };

  goToMap = () => {
    this.setState({ page: 2 });
  };

  goBackFromNewPost = () => {
    this.resetPage();
  };

  goToOffPost = (offPost) => {
    this.state.offPostSelected = offPost;
    this.state.page = 3;
    this.setState(this.state);
  };

  changeDirection = () => {
    this.state.lines.forEach((line) => {
      if (Model.Did == line.terminus1.did) {
        Model.Did = line.terminus2.did;
        Model.LineSelected = line.terminus2.sname;
        Storage.saveDid(line.terminus2.did);

        this.setState(this.state);
        this.resetPage();
      } else if (Model.Did == line.terminus2.did) {
        Model.Did = line.terminus1.did;
        Model.LineSelected = line.terminus1.sname;
        Storage.saveDid(line.terminus1.did);

        this.setState(this.state);
        this.resetPage();
      }
    });
  };
}

export default Bacheca;
