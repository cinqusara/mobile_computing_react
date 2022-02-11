import React from "react";
import { Component } from "react";
import { Text, View } from "react-native";

//style
import { COLORS } from "../../../../utilities/styles/MyColors";
import { STYLES } from "../../../../utilities/styles/MyStyles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Avatar, FAB } from "react-native-paper";

//component
import CommunicationController from "../../../../utilities/CommunicationController";
import Model from "../../../../utilities/Model";
import StorageManager from "../../../../utilities/storage/StorageManager";

//import alert no connection
import { alertNoConnection } from "../../../../utilities/functionAlertNoConncetion";

class Post extends Component {
  state = {
    post: this.props.data.item,
    imgUser:
      "https://gogeticon.net/files/3160437/160288ffac991fe4b11f27f32622263a.png",
    placeHolderImg:
      "https://gogeticon.net/files/3160437/160288ffac991fe4b11f27f32622263a.png",
    changedImg: true,
  };

  componentDidMount() {
    console.log("in render component did mount");
    this.renderImg();
  }

  componentDidUpdate() {
    console.log("in render component did update");
    if (this.state.post.pversion != this.props.data.item.pversion) {
      console.log("in render component did update --> in if");
      //this.setState({ changedImg: false });
      this.renderImg();
    }
  }

  /* FIXME: se cambio l'immagine del mio profilo o il nome e torno su bacheca non si vede la foto aggiornata 
            devo trovare il modo di richiamare renderImg() ogni volta che torno su bacheca
            unica cosa è che se uso component did update mi esce il warning sotto */

  // Warning: Can't perform a React state update on an unmounted component.
  //This is a no-op, but it indicates a memory leak in your application. To fix,
  //cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

  render() {
    console.log("in redenr post");
    return (
      <View style={this.setStyle()}>
        <View style={STYLES.innerContainer}>
          <View style={STYLES.userInfoSection}>
            <Avatar.Image
              source={{
                uri: this.state.imgUser,
              }}
              size={80}
              style={{ backgroundColor: COLORS.white }}
            />
            <FAB
              style={this.setFab()}
              small
              icon={() => (
                <Ionicons
                  name={this.setIcon()}
                  size={25}
                  color={COLORS.white}
                  style={STYLES.iconPost}
                />
              )}
              onPress={() => this.setFollowUnfollow()}
            />
          </View>

          <View style={STYLES.infoLine}>
            <Text>
              <Text style={STYLES.titlePost}>
                {this.props.data.item.authorName}
              </Text>
              {"\n"}
              <Text style={STYLES.dateTime}>
                {this.convertDate()} -- {this.convertTime()}
              </Text>
              {"\n"} {"\n"}
              <Text style={STYLES.textBold}>Ritardo</Text> {this.convertDelay()}
              {"\n"}
              <Text style={STYLES.textBold}>Stato</Text> {this.convertStatus()}
              {"\n"}
            </Text>
            <View style={STYLES.commentPost}>
              <Text style={STYLES.textComment}>
                {this.setComment(this.props.data.item.comment)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  //FUNZIONI DI CONVERSIONE DEI DATI DEL POST

  convertDate() {
    let fullDateTime = this.props.data.item.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let dateString = arrayDateTime[0];

    return dateString;
  }

  convertTime() {
    let fullDateTime = this.props.data.item.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let timeString = arrayDateTime[1];

    return timeString.slice(0, 5);
  }

  convertStatus() {
    switch (this.props.data.item.status) {
      case 0:
        return "In orario";
      case 1:
        return "Ritardo di pochi minuti";
      case 2:
        return "Ritardo oltre i 15 minuti";
      case 3:
        return "Treni soppressi";
      default:
        return "Nessuna informazione";
    }
  }

  convertDelay() {
    switch (this.props.data.item.delay) {
      case 0:
        return "Situazione ideale";
      case 1:
        return "Situazione accettabile";
      case 2:
        return "Gravi problemi";
      default:
        return "Nessuna informazione";
    }
  }

  //FUNZIONE PER SETTARE ICONA FOLLOW/UNFOLLOW

  setIcon = () => {
    if (this.props.data.item.followingAuthor == false) {
      return "add-circle";
    } else {
      return "checkmark-outline";
    }
  };

  setStyle = () => {
    if (this.props.data.item.followingAuthor == false) {
      return STYLES.boxPost;
    } else {
      return STYLES.boxPostFollow;
    }
  };

  setFab = () => {
    if (this.props.data.item.followingAuthor == false) {
      return STYLES.fabPost;
    } else {
      return STYLES.fabPostFollow;
    }
  };

  setFollowUnfollow = () => {
    if (this.props.data.item.followingAuthor == false) {
      //inizia a seguire l'utente
      this.setFollow();
    } else {
      //smette di seguire l'utente
      this.setUnfollow();
    }
  };

  setFollow = () => {
    CommunicationController.follow(Model.Sid, this.props.data.item.author)
      .then((result) => {
        // console.log("settato follow");
        this.setState({ follow: true });
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  };

  setUnfollow = () => {
    CommunicationController.unfollow(Model.Sid, this.props.data.item.author)
      .then((result) => {
        // console.log("settato unfollow");
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection();
      });
  };

  setComment = (comment) => {
    let text;
    if (comment != undefined) {
      text = comment.replace(/\n/g, " ");
    }
    return text;
  };

  //FUNZIONE DI RENDER IMMAGINE
  renderImg = () => {
    console.log("in redenr img post");
    let sm = new StorageManager();

    if (this.props.data.item.pversion == 0) {
      this.state.imgUser = this.state.placeHolderImg;
      this.setState(this.state);
    } else {
      //recupero l'utente
      sm.getUser(this.props.data.item.author)
        .then((result) => {
          if (result == null) {
            console.log("utente non presente");
            //UTENTE NON PRESENTE - devo fare la chiamata di rete, recuperare la foto e aggiungerlo al db
            this.downloadImgUser();
          } else {
            console.log("utente presente");
            //UTENTE PRESENTE - controllo la versione della foto
            this.checkPversionImg(result);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  checkPversionImg = (result) => {
    //confrontiamo la versione nel db con quella passata dal post
    if (result.pversion == this.props.data.item.pversion) {
      console.log("versioni uguali");
      //se sono uguali la mostriamo
      this.state.imgUser = "data:image/png;base64," + result.picture;
      this.setState(this.state);
    } else {
      //altrimenti la scarichiamo e la settiamo nel db
      console.log("immagine dell'utente è cambiata --> download");
      this.state.post = this.props.data.item;
      this.setState(this.state);
      this.downloadImgUser();
    }
  };

  downloadImgUser = () => {
    CommunicationController.getUserPicture(
      Model.Sid,
      this.props.data.item.author
    )
      .then((result) => {
        //dopo aver trovato l'immagine la inseriamo nel db
        this.setDB(result.picture);
      })
      .catch((e) => {
        console.error(e);
        alertNoConnection();
      });
  };

  //FUNZIONE PER RIEMPIRE DB
  setDB = (picture) => {
    let sm = new StorageManager();

    sm.insertUser(
      this.props.data.item.author,
      picture,
      this.props.data.item.pversion
    )
      .then((result) => {
        this.state.imgUser = "data:image/png;base64," + picture;
        this.setState(this.state);
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export default Post;
