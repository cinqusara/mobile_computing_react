import React from "react";
import { Component } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";

//import page
import Model from "../../../utilities/Model";

//import per profilo
import {
  Avatar,
  Title,
  Caption,
  TextInput,
  HelperText,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS } from "../../../utilities/styles/MyColors";
import { STYLES } from "../../../utilities/styles/MyStyles";

//import per galleria
import * as ImagePicker from "expo-image-picker";

//import aller
import { alertNoConnection } from "../../../utilities/functionAlertNoConncetion";

//import per toast
import CommunicationController from "../../../utilities/CommunicationController";

class Profilo extends Component {
  state = {
    navigation: this.props.navigation,
    imgTooLarge: false,
    imgUserBase64: "",
    errorName: false,
    userName: Model.UserName,
    newUserName: "",
    visibility: false,
  };

  componentDidMount() {
    this.downloadUserData();
  }

  render() {
    return (
      <SafeAreaView
        style={(STYLES.container, { backgroundColor: COLORS.primaryColor })}
      >
        <View style={STYLES.mainContainerProfile}>
          <View style={STYLES.userImgSection}>
            <Avatar.Image
              source={{
                uri: this.setImgUser(),
              }}
              size={140}
              style={{ backgroundColor: COLORS.white }}
            />
          </View>
          <View style={STYLES.containerBtnChangeImg}>
            <TouchableOpacity
              style={STYLES.floatingButtonChangeImg}
              onPress={() => this.changeUserImg()}
            >
              <Ionicons name="camera" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          {this.renderLabelChangeName()}
        </View>
      </SafeAreaView>
    );
  }

  //FUNZIONE DI RENDER PER MOSTRARE LABEL MODIFICA NOME
  renderLabelChangeName = () => {
    if (this.state.visibility == true) {
      return (
        <View style={STYLES.labeTextInput}>
          {this.renderHelperUsername()}

          <View style={STYLES.containerTextInputName}>
            <TextInput
              label="Nome"
              mode="outlined"
              multiline={false}
              activeOutlineColor={COLORS.primaryColor}
              onChangeText={(text) => this.handlerText(text)}
              maxLength={20}
              style={STYLES.textInputName}
            />
          </View>
          <View style={STYLES.commitChangesBtn}>
            <View style={STYLES.wrappedBtn}>
              <TouchableOpacity onPress={() => this.commitChangesDone()}>
                <Ionicons
                  name="checkmark-circle"
                  size={40}
                  color={COLORS.lightColor2}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.commitChangesCancel()}>
                <Ionicons
                  name="close-circle"
                  size={40}
                  color={COLORS.lightColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <View style={STYLES.nameView}>
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
        </View>
      );
    }
  };

  //FUNZIONE DI RENDER PER QUANDO VIENE SETTATO UN NOME NULLO
  renderHelperUsername = () => {
    const hasErrors = () => {
      return this.state.errorName == true || this.state.newUserName.length > 20;
    };
    return (
      <HelperText
        type="error"
        visible={hasErrors()}
        style={STYLES.helperTextName}
      >
        Errore: inserire un nome corretto
      </HelperText>
    );
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
        this.setState({ imgTooLarge: false });
        this.updateNewImgUser(result.base64);
        Model.UserImg = result.base64;
      } else {
        console.log("l'immagine non è corretta");
        this.setState({ imgTooLarge: true });
        this.showToast();
      }
    }
  };

  changeName = () => {
    if (this.state.visibility == true) {
      this.setState({ visibility: false });
    } else {
      this.setState({ visibility: true });
    }
  };

  //FUNZIONE PER SALVARE CONTENUTO TEXT INPUT
  handlerText = (text) => {
    this.setState({ newUserName: text });
  };

  //FUNZIONE PER IL CONTROLLO DEL NOME
  commitChangesDone = () => {
    if (
      this.state.newUserName.length <= 20 &&
      this.state.newUserName.length != 0
    ) {
      this.setState({ visibility: false });
      this.setState({ errorName: false });
      Model.AuthorName = this.state.newUserName;
      this.updateNewUserName(this.state.newUserName);
    } else {
      this.setState({ errorName: true });
    }
  };

  commitChangesCancel = () => {
    this.state.errorName = false;
    this.state.visibility = false;
    this.setState(this.state);
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
      return "https://gogeticon.net/files/3160437/160288ffac991fe4b11f27f32622263a.png";
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
  };

  //CHIAMATA DI RETE
  downloadUserData() {
    CommunicationController.getProfile(Model.Sid)
      .then((result) => {
        if (result.name != "unnamed") {
          this.state.userName = result.name;
        }

        if (result.picture != null) {
          this.state.imgUserBase64 = result.picture;
          Model.UserImg = result.picture;
        }

        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  }

  updateNewUserName = (name) => {
    CommunicationController.setProfile(
      Model.Sid,
      name,
      this.state.imgUserBase64
    )
      .then((result) => {
        //solo se riesce a caricare i dati sul server facciamo le set del model
        console.log("saved name SUCCESS");
        Model.UserName = this.state.newUserName;
        this.state.userName = name;
        this.setState(this.state);
      })
      .catch((e) => {
        //se non riesce a caricare i dati, lo username viene ripristinato
        console.error("Error " + e);
        alertNoConnection();
      });
  };

  updateNewImgUser = (img) => {
    CommunicationController.setProfile(Model.Sid, this.state.userName, img)
      .then((result) => {
        //solo se riesce a caricare i dati sul server facciamo le set
        console.log("saved img SUCCESS");
        this.state.imgUserBase64 = img;
        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  };
}

export default Profilo;
