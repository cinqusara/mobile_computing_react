import React from "react";
import { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { COLORS } from "../../../../utilities/styles/MyColors";
import { STYLES } from "../../../../utilities/styles/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RadioButton, TextInput, Button, HelperText } from "react-native-paper";

//import pages
import CommunicationController from "../../../../utilities/CommunicationController";
import Model from "../../../../utilities/Model";

//import alert no connection
import { alertNoConnection } from "../../../../utilities/functionAlertNoConncetion";

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

  render() {
    return (
      <View style={STYLES.container}>
        {this.renderTitle()}
        {this.renderGeneralHandlerComment()}
        {this.renderComment()}

        <View style={STYLES.innerContainerNewPost}>
          {this.renderStatus()}
          <View style={STYLES.divider}></View>
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
        <Text style={STYLES.title}>CREA NUOVO POST</Text>
        <Text style={STYLES.titleNewPost}>{Model.LineSelected}</Text>
      </View>
    );
  };

  //FUNZIONE DI RENDER PER RADIO BUTTON STATO
  renderStatus = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.captionNewPost}>STATO</Text>
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

  setStatusChecked = (radio) => {
    this.state.stateChecked = radio;
    this.setState(this.state);
  };

  //FUNZIONE DI RENDER PER RADIO BUTTON DELAY
  renderDelay = () => {
    return (
      <View style={STYLES.middleViewNewPost}>
        <Text style={STYLES.captionNewPost}>RITARDO</Text>
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

  setDelayChecked = (radio) => {
    this.state.delayChecked = radio;
    this.setState(this.state);
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
            style={{ textAlign: "center" }}
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

  //FUNZIONE DI RENDER PER IL COMMENTO
  renderComment = () => {
    const hasErrors = () => {
      return this.state.comment.length > 99;
    };
    return (
      <View style={STYLES.viewComment}>
        <HelperText type="error" visible={hasErrors()}>
          Hai raggiunto il massimo di caratteri!
        </HelperText>

        <TextInput
          label="Commento"
          mode="outlined"
          multiline={false}
          activeOutlineColor={COLORS.primaryColor}
          onChangeText={(text) => this.handlerComment(text)}
          maxLength={100}
        />
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
  };

  hideDialog = () => {
    console.log("press");
  };

  //CHIAMATE DI RETE

  uploadNewPost = () => {
    if (
      this.state.comment == "" &&
      this.state.delayChecked == "" &&
      this.state.stateChecked == ""
    ) {
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
          this.props.onPress();
        })
        .catch((e) => {
          console.error(e);
          alertNoConnection();
        });
    }
  };
}

export default NewPost;
