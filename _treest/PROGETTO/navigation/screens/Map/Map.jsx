import React from "react";
import { Component } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../../utilities/MyColors";
import Ionicons from "react-native-vector-icons/Ionicons";

//import per la posizione dell'utente
import * as Location from "expo-location";

//import per la mappa
import MapView from "react-native-maps";
import { Marker, Polyline } from "react-native-maps";
import CommunicationController from "../../../utilities/CommunicationController";

//import pages
import Model from "../../../utilities/Model";

/* TODO
[ ] mettere pallino per far vedere la posizione dell'utente
[x] mettere i markatori per ogni stazione
[ ] implementare le polyne
 */

class Map extends Component {
  state = {
    requestStatus: "Waiting...",
    did: Model.Did,
    sid: Model.Sid,
    stations: "",
    currentUserLocation: "",
    canUseLocation: false,
  };

  componentDidMount() {
    this.locationPermissionAsync();
    this.downloadStation();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.requestStatus}</Text>
        <MapView
          showsUserLocation={this.state.canUseLocation}
          showsMyLocationButton={true}
          style={styles.map}
          onRegionChange={this.handleRegionChanged}
          initialRegion={{
            //Milano
            latitude: 45.4642,
            longitude: 9.19,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {Object.entries(this.state.stations).map((station) => (
            //crea un array, dove per ogni parametro ha in 0 la posizion e in 1 tutto l'oggetto
            <Marker
              //pinColor="blue"
              key={station[1].sname}
              coordinate={{
                latitude: parseFloat(station[1].lat),
                longitude: parseFloat(station[1].lon),
              }}
              title={station[1].sname}
              // description={station[1].lat}
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.floatingButton}
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
  }

  /* FUNZIONE PER PERMESSO POSIZIONE */

  async locationPermissionAsync() {
    let canUseLocation = false;
    const grantedPermission = await Location.getForegroundPermissionsAsync();
    if (grantedPermission.status == "granted") {
      console.log("permission granted");
      this.state.requestStatus = "Permesso già concesso";
      canUseLocation = true;
      this.setState({ canUseLocation: true });
    } else {
      console.log("permission not granted --> request");
      const permissionResponse =
        await Location.requestForegroundPermissionsAsync();
      if (permissionResponse.status == "granted") {
        console.log("Permission granted");
        this.state.requestStatus = "Permesso concesso";
        canUseLocation = true;
        this.setState({ canUseLocation: true });
      } else {
        this.state.requestStatus = "Permesso non concesso";
      }
    }
    this.setState(this.state);

    if (canUseLocation) {
      const location = await Location.getCurrentPositionAsync();
      this.state.currentUserLocation = location;
      this.state.canUseLocation = true;
      console.log(
        "recive location: " +
          location.coords.latitude +
          " - " +
          location.coords.longitude
      );
      this.setState(this.state);
    }
  }

  handleRegionChanged(region) {
    //console.log(region);
  }

  /* CHIAMATE DI RETE */
  downloadStation() {
    CommunicationController.getStations(this.state.sid, this.state.did)
      .then((result) => {
        this.state.stations = result.stations;
        this.setState(this.state);
      })
      .catch((e) => {
        console.error("Error " + e);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 60,
    shadowRadius: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: COLORS.primaryColor,
    bottom: -250,
  },
});

export default Map;
