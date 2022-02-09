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
      "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
    placeHolderImg:
      "https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png",
  };

  componentDidMount() {
    // console.log(this.props);
    this.renderImg();
  }

  // componentDidUpdate() {
  //   this.renderImg();
  // }

  /* FIXME: se cambio l'immagine del mio profilo e torno su bacheca non si vede la foto aggiornata 
            devo trovare il modo di richiamare renderImg() ogni volta che torno su bacheca
            unica cosa è che se uso component did update mi esce il warning sotto */

  // Warning: Can't perform a React state update on an unmounted component.
  //This is a no-op, but it indicates a memory leak in your application. To fix,
  //cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.

  render() {
    /*
  
    [ ] sistemare layout post
    [x] inserire immagine
    [ ] eliminare gli a capo dal post 
    [x] bottone follow/unfollow
    [ ] usare solo i props e non lo state
    [ ] cercare di capire come ridurre la variabile this.props.data.item in post
    [ ] fare dei controlli sull'immagine prima di visualizzarli
    [ ] se l'immagine in base 64 non è corretta la visualizza bianca, lasciare così?
    
    */

    return (
      <View style={STYLES.boxPost}>
        <View style={STYLES.innerContainer}>
          <View style={STYLES.userInfoSection}>
            <Avatar.Image
              source={{
                // uri: this.renderImg(),
                uri: this.state.imgUser,
              }}
              size={80}
            />
            <FAB
              style={STYLES.fabPost}
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
              <Text style={STYLES.title}>{this.state.post.authorName}</Text>
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
              <Text style={STYLES.textComment}>{this.state.post.comment}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  //FUNZIONI DI CONVERSIONE DEI DATI DEL POST

  convertDate() {
    let fullDateTime = this.state.post.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let dateString = arrayDateTime[0];

    return dateString;
  }

  convertTime() {
    let fullDateTime = this.state.post.datetime;
    const arrayDateTime = fullDateTime.split(" ");
    let timeString = arrayDateTime[1];

    return timeString.slice(0, 5);
  }

  convertStatus() {
    switch (this.state.post.status) {
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
    switch (this.state.post.delay) {
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
    CommunicationController.follow(Model.Sid, this.state.post.author)
      .then((result) => {
        console.log("settato follow");
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection()
      });
  };

  setUnfollow = () => {
    CommunicationController.unfollow(Model.Sid, this.state.post.author)
      .then((result) => {
        console.log("settato unfollow");
        this.props.onPress();
      })
      .catch((e) => {
        console.error("Error " + e);
        alertNoConnection()
      });
  };

  //FUNZIONE DI RENDER IMMAGINE

  renderImg = () => {
    let sm = new StorageManager();

    if (this.props.data.item.pversion == 0) {
      return this.state.placeHolderImg;
    } else {
      //recupero l'utente
      sm.getUser(this.props.data.item.author)
        .then((result) => {
          if (result == null) {
            //UTENTE NON PRESENTE - devo fare la chiamata di rete, recuperare la foto e aggiungerlo al db
            this.downloadImgUser();
          } else {
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
      //se sono uguali la mostriamo
      console.log("immagine nel db è aggiornata");
      this.state.imgUser = "data:image/png;base64," + result.picture;
      this.setState(this.state);
    } else {
      //altrimenti la scarichiamo e la settiamo nel db
      console.log("immagine nel db non è aggiornata");
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
        alertNoConnection()
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
        //posso anche solo fare il set state
        //--> se però l'utente in quel momento cambia img io me ne accorgo alla seconda renderizzazione
        this.renderImg();
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export default Post;
