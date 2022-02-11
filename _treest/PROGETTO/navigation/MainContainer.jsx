import * as React from "react";
import { Component } from "react";
import { View, Alert } from "react-native";

//import per navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//import screens
import Bacheca from "./screens/Bacheca/Bacheca";
import Tratte from "./screens/Tratta/Tratte";
import Profilo from "./screens/Profilo/Profilo";

//import other page
import CommunicationController from "../utilities/CommunicationController";
import Storage from "../utilities/storage/Storage";
import Model from "../utilities/Model";
import NoLineSelected from "./screens/Bacheca/NoLineSelected";

//import components
import { COLORS } from "../utilities/styles/MyColors";

//import alert no connection
import alertNoConnection from "../utilities/functionAlertNoConncetion";

//const for screen
const bacheca = "Bacheca";
const tratte = "Tratte";
const profilo = "Profilo";

//const Tab
const Tab = createBottomTabNavigator();

class MainContainer extends Component {
  state = {
    sid: "",
    did: "",
    lines: "",
    posts: "",
    firstLaunch: null,
    tratteScreen: null,
  };

  //invocato subito dopo il primo ciclo di render
  componentDidMount() {
    Storage.checkFirstRun()
      .then((result) => {
        if (result == true) {
          console.log("primo avvio");
          this.setState({ firstLaunch: true });
          this.firstLaunchActions();
        } else {
          console.log("secondo avvio");
          this.setState({ firstLaunch: false });
          this.secondLauchActions();
        }
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  }

  render() {
    switch (this.state.tratteScreen) {
      case true:
        return this.renderNavigator(tratte);
      case false:
        return this.renderNavigator(bacheca);
      case null: //all'inizio chiama sempre questo caso
        return null;
    }
  }

  renderNavigator(primaPagina) {
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={primaPagina} //radice da dove parte la navigationbar
          screenOptions={({ route }) => ({
            //route = location dove siamo ora

            tabBarHideOnKeyboard: true, //quando scriviamo la tabbar si abbassa
            tabBarIcon: ({ focused, color, size }) => {
              //specifichiamo colore, size etc. dell'icona
              let iconName;
              let routeName = route.name;

              if (routeName === tratte) {
                iconName = focused ? "train" : "train-outline"; //if ternario --> se icon name è su 'focused' prende l'icona home, altrimenti 'home-outline'
              } else if (routeName === bacheca) {
                iconName = focused ? "grid" : "grid-outline";
              } else if (routeName === profilo) {
                iconName = focused ? "person" : "person-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarInactiveTintColor: COLORS.darkGrey,
            tabBarActiveTintColor: COLORS.primaryColor,
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: {
              position: "absolute",
              bottom: 25,
              left: 20,
              right: 20,
              elevation: 0,
              backgroundColor: COLORS.white,
              borderRadius: 15,
              height: 90,
            },
          })}
        >
          <Tab.Screen
            name={bacheca}
            component={this.setComponent()}
            initialParams={{
              sid: this.state.sid,
              did: this.state.did,
              lines: this.state.lines,
            }}
          />
          <Tab.Screen
            name={tratte}
            component={Tratte}
            initialParams={{
              sid: this.state.sid,
              lines: this.state.lines,
              onSelect: this.changePage,
            }}
          />
          <Tab.Screen name={profilo} component={Profilo} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  /** CHIAMATE PER RECUPERARE I DATI PER PRIMO AVVIO E SECONDO */
  firstLaunchActions() {
    this.welcome();
    CommunicationController.register()
      .then((result) => {
        this.state.sid = result.sid;
        this.setState(this.state);
        Storage.saveSid(result.sid);
        Model.Sid = result.sid;
        this.downloadLinee(this.state.sid);
      })
      .catch((error) => {
        console.error("Error in register: " + error);
        alertNoConnection();
      });
  }

  secondLauchActions() {
    Storage.getSid()
      .then((result) => {
        this.state.sid = result;
        this.setState(this.state);
        Model.Sid = result;
      })
      .catch((e) => {
        console.error("Error in getSid: " + e);
      });

    Storage.getDid()
      .then((result) => {
        if (result != null) {
          console.log("secondo avvio con did");
          this.state.did = result;
          this.setState(this.state);
          Model.Did = result;
        }
        this.downloadLinee(this.state.sid); //faccio sempre il download delle linee
      })
      .catch((e) => {
        console.error("Error in getDid: " + e);
      });
  }

  //FUNZIONE PER SETTARE SCHERMATA PER CLICCARE TRATTA
  setComponent = () => {
    if (Model.LineSelected == undefined && this.state.did == "") {
      return NoLineSelected;
    } else {
      return Bacheca;
    }
  };

  /** CHIAMATE DI RETE */
  downloadLinee(sid) {
    CommunicationController.getLines(sid)
      .then((result) => {
        this.state.lines = result.lines;
        this.setState(this.state);
        /** settaggio della variabile tratteScreen per cambiare la pagina */
        if (this.state.firstLaunch == true) {
          this.setState({ tratteScreen: true });
        } else if (this.state.did == "") {
          //SECONDO AVVIO, NO DID -> rimaniamo su tratte
          this.setState({ tratteScreen: true });
        } else if (this.state.did != "") {
          //SECONDO AVVIO, SI DID -> andiamo su bacheca
          this.setState({ tratteScreen: false });
        }
      })
      .catch((error) => {
        console.error("Error: " + error);
        alertNoConnection();
      });
  }

  /** ALTRE FUNZIONI */

  changePage = (did) => {
    this.setState({ tratteScreen: false });
    this.setState({ did: did });
    <View>
      <Bacheca></Bacheca>
    </View>;
  };

  welcome = () => {
    Alert.alert("BENVENUTO", "Seleziona una tratta per vedere i post", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
}

export default MainContainer;
