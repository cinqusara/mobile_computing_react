import React from "react";
import { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Picker,
} from "react-native";
import { COLORS } from "../../../../utilities/MyColors";
import { STYLES } from "../../../../utilities/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, TextInput, Button, HelperText } from "react-native-paper";

//import pages
import CommunicationController from "../../../../utilities/CommunicationController";
import Storage from "../../../../utilities/Storage";
import Model from "../../../../utilities/Model";

//import components
import Post from "./Post";

/* TODO
[ ] sistemare le dimensioni delle view
[ ] sistemare layout per il titolo
*/

class NewPost extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    stateChecked: "",
    delayChecked: "",
    comment: "",
    errorUpload: false,
  };

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <View style={STYLES.container}>
        {this.renderTitle()}
        {this.renderGeneralHandlerComment()}
        {this.renderComment()}

        <View style={STYLES.innerContainerNewPost}>
          {this.renderStatus()}
          {this.renderDelay()}
        </View>
        {this.renderBtnUploadNewPost()}
        {this.renderBackBtn()}
      </View>
    );
  }

  //FUNZIONE DI RENDER PER TITOLO
  renderTitle = () => {
    return (
      <View style={STYLES.titleViewNewPost}>
        <Text style={STYLES.title}>
          CREA NUOVO POST{"\n"}
          {Model.LineSelected}
        </Text>
      </View>
    );
  };

  //FUNZIONE DI RENDER PER RADIO BUTTON STATO
  renderStatus = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.caption}>STATO</Text>
        <RadioButton.Group
          onValueChange={(value) => this.setStatusChecked(value)}
          value={this.state.stateChecked}
        >
          <RadioButton.Item
            label="Situazione ideale"
            value="0"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Situazione accettabile"
            value="1"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Gravi problemi"
            value="2"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
        </RadioButton.Group>
      </View>
    );
  };

  //FUNZIONE DI RENDER PER RADIO BUTTON DELAY
  renderDelay = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.caption}>RITARDO</Text>
        <RadioButton.Group
          onValueChange={(value) => this.setDelayChecked(value)}
          value={this.state.delayChecked}
        >
          <RadioButton.Item
            label="In orario"
            value="0"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Ritardo di pochi minuti"
            value="1"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Ritardo oltre i 15 minuti"
            value="2"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
          <RadioButton.Item
            label="Treni soppressi"
            value="3"
            labelStyle={STYLES.fontSizeNewPost}
            color={COLORS.primaryColor}
          />
        </RadioButton.Group>
      </View>
    );
  };

  //FUNZIONE DI RENDER PER BOTTONE BACK
  renderBackBtn = () => {
    return (
      <View style={STYLES.bottomViewNewPost}>
        <TouchableOpacity
          style={STYLES.floatingButtonBack}
          onPress={() => this.props.onSelect()}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={COLORS.white}
          />
        </TouchableOpacity>
      </View>
    );
  };

  //FUNZIONE DI RENDER PER BOTTONE UPLOAD NEW POST
  renderBtnUploadNewPost = () => {
    return (
      <Button
        icon="upload"
        mode="contained"
        onPress={() => this.uploadNewPost()}
        color={COLORS.primaryColor}
      >
        CARICA NUOVO POST
      </Button>
    );
  };

  setStatusChecked = (radio) => {
    this.state.stateChecked = radio;
    this.setState(this.state);
    console.log(this.state.stateChecked);
  };

  setDelayChecked = (radio) => {
    this.state.delayChecked = radio;
    this.setState(this.state);
    console.log(this.state.delayChecked);
  };

  //FUNZIONE DI RENDER PER IL COMMENTO
  renderComment = () => {
    const hasErrors = () => {
      return this.state.comment.length > 100;
    };
    //TODO fare in modo che la tastiera non porti in alto la navbar
    return (
      <View style={STYLES.viewComment}>
        <TextInput
          label="Commento"
          mode="outlined"
          multiline={false}
          activeOutlineColor={COLORS.primaryColor}
          onChangeText={(text) => this.handlerComment(text)}
          maxLength={100}
        />

        <HelperText type="error" visible={hasErrors()}>
          Hai raggiunto il massimo di caratteri!
        </HelperText>
      </View>
    );
  };

  renderGeneralHandlerComment = () => {
    const hasErrors = () => {
      return this.state.errorUpload == true;
    };

    return (
      <HelperText type="error" visible={hasErrors()}>
        Devi compilare almeno un campo
      </HelperText>
    );
  };

  handlerComment = (text) => {
    this.state.comment = text;
    this.setState(this.state);
    console.log(this.state.comment);
  };

  //CHIAMATE DI RETE

  uploadNewPost = () => {
    if (
      this.state.comment == "" &&
      this.state.delayChecked == "" &&
      this.state.stateChecked == ""
    ) {
      console.log("nessun campo compilato");
      this.state.errorUpload = true;
      this.setState(this.state);
    } else {
      CommunicationController.addPost(
        Model.Sid,
        Model.Did,
        this.state.delayChecked,
        this.state.stateChecked,
        this.state.comment
      )
        .then((result) => {
          console.log(result);
          this.props.onPress();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
}

export default NewPost;
