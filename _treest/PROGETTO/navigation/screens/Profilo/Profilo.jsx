/* TODO 
[ ] inserire uno sfondo
[ ] inserire contatore caratteri invece che toast
*/

import React from "react";
import { Component, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";

//import page
import Model from "../../../utilities/Model";

//import per profilo
import { Avatar, Title, Caption, TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../utilities/MyColors";
import { STYLES } from "../../../utilities/MyStyles";

//import per galleria
import * as ImagePicker from "expo-image-picker";

//import per toast
import { Toast } from "react-native-toast-message"; //TODO provare ad installare questi tipi di toast
import CommunicationController from "../../../utilities/CommunicationController";

class Profilo extends Component {
  state = {
    navigation: this.props.navigation,
    imgTooLarge: false,
    imgUserBase64: "",
    nameTooLong: false,
    userName: Model.UserName,
    newUserName: "",
    visibility: false,
  };

  componentDidMount() {
    this.downloadUserData();
  }

  render() {
    return (
      <SafeAreaView style={STYLES.container}>
        {/* img */}
        <View style={STYLES.userInfoSection}>
          <Avatar.Image
            source={{
              uri: this.setImgUser(),
            }}
            size={80}
          />
        </View>

        {/* btn change img */}
        <View style={STYLES.containerBtnChangeImg}>
          <TouchableOpacity
            style={STYLES.floatingButtonChangeImg}
            onPress={() => this.changeUserImg()}
          >
            <Ionicons name="camera" size={13} color={COLORS.primaryColor} />
          </TouchableOpacity>
        </View>

        {/* username e btn change name */}
        <View>
          <Title style={STYLES.userNameTitle}>{this.setUserName()}</Title>
          <Pressable
            onPress={() => this.changeName()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.lightColor : COLORS.white,
              },
              STYLES.wrapperCustom,
            ]}
          >
            <Caption style={STYLES.caption}>modifica nome</Caption>
          </Pressable>
        </View>

        {/* text input user name */}
        {this.renderLabelChangeName()}
      </SafeAreaView>
    );
  }

  //FUNZIONE DI RENDER PER MOSTRARE LABEL MODIFICA NOME
  renderLabelChangeName = () => {
    if (this.state.visibility == true) {
      return (
        <View>
          <View style={STYLES.containerTextInputName}>
            <TextInput
              style={STYLES.newUserNameInput}
              onChangeText={(text) => this.handleText(text)}
            />
          </View>
          <View style={STYLES.commitChangesBtn}>
            <Pressable
              onPress={() => this.commitChanges()}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? COLORS.lightColor : COLORS.white,
                },
                STYLES.wrapperCustom,
              ]}
            >
              <Caption style={STYLES.caption}>modifica</Caption>
            </Pressable>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  //FUNZIONE PER CARICARE NUOVA FOTO
  changeUserImg = async () => {
    console.log("change user img");
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      if (result.base64.length <= 137000) {
        console.log("l'immagine è corretta");
        this.setState({ imgUser: result.uri, imgTooLarge: false });
        this.updateNewUserImg(result.base64);
        this.state.imgUserBase64 = result.base64;
        this.setState(this.state);
        /*TODO 
        [ ] salvarla in maniera persistente
        */
      } else {
        console.log("l'immagine non è corretta");
        this.setState({ imgTooLarge: true });
        this.showToast();
      }
    }
  };

  changeName = () => {
    this.setState({ visibility: true });
  };

  //FUNZIONE PER SALVARE CONTENUTO TEXT INPUT
  handleText = (text) => {
    this.setState({ newUserName: text });
  };

  //FUNZIONE PER IL CONTROLLO DEL NOME
  commitChanges = () => {
    if (this.state.newUserName.length < 20) {
      this.state.userName = this.state.newUserName;
      this.setState(this.state);
      Model.UserName = this.state.newUserName;
      this.setState({ visibility: false });
      this.updateNewUserName();
    } else {
      this.setState({ nameTooLong: true });
      this.showToast();
    }
  };

  //FUNZIONI PER SETTARE O MENO NOME E FOTO DI PLACEHOLDER
  setUserName = () => {
    if (this.state.userName == undefined) {
      let name = Model.Sid.slice(0, 5);
      return "username_" + name;
    } else {
      return this.state.userName;
    }
  };

  setImgUser = () => {
    if (this.state.imgUserBase64 == "") {
      return "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png";
    } else {
      return "data:image/png;base64," + this.state.imgUserBase64;
    }
  };

  //FUNZIONE PER MOSTRARE MESSAGGI DI ERRORE
  showToast = () => {
    if (this.state.imgTooLarge == true) {
      ToastAndroid.show("Formato immagine non corretto", ToastAndroid.LONG);
      this.setState({ imgTooLarge: false }); //dopo aver mostrato il toast risetto la variabile a false
    }
    if (this.state.nameTooLong == true) {
      console.log("toast per nome");
      ToastAndroid.show(
        "Nome troppo lungo, resta nei 20 caratteri",
        ToastAndroid.LONG
      );
      this.setState({ nameTooLong: false });
    }
  };

  //CHIAMATA DI RETE
  downloadUserData() {
    CommunicationController.getProfile(Model.Sid)
      .then((result) => {
        console.log(result.name, result.pversion);
        if (result.name != "unnamed") {
          this.state.userName = result.name;
        }

        if (result.picture != null) {
          this.state.imgUserBase64 = result.picture;
        }

        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  }

  updateNewUserName() {
    console.log("dentro update new user name");
    let img;
    if (this.state.imgUserBase64 == "") {
      img = null;
    } else {
      img = this.state.imgUserBase64;
    }

    CommunicationController.setProfile(Model.Sid, this.state.userName, img)
      .then((result) => {
        console.log("saved name SUCCESS");
      })
      .catch((e) => {
        console.error("Error in update name " + e);
      });
  }

  updateNewUserImg(imgBase64) {
    let name;
    if (this.state.userName == undefined) {
      name = "unnamed";
    } else {
      name = this.state.userName;
    }
    CommunicationController.setProfile(Model.Sid, name, imgBase64)
      .then((result) => {
        console.log("saved img SUCCESS");
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  }
}

export default Profilo;