import React from "react";
import { Component } from "react";
import { Text, View, TouchableOpacity, StatusBar } from "react-native";
import { COLORS } from "../../../utilities/styles/MyColors";
import Ionicons from "react-native-vector-icons/Ionicons";
import { STYLES } from "../../../utilities/styles/MyStyles";

//import per la posizione dell'utente
import * as Location from "expo-location";

//import per la mappa
import MapView, { MarkerAnimated } from "react-native-maps";
import { Marker, Polyline } from "react-native-maps";
import CommunicationController from "../../../utilities/CommunicationController";

//import pages
import Model from "../../../utilities/Model";
import InfoSponsor from "./InfoSponsor";

//import alert no connection
import { alertNoConnection } from "../../../utilities/functionAlertNoConncetion";

class Map extends Component {
  state = {
    requestStatus: "Waiting...",
    did: Model.Did,
    sid: Model.Sid,
    stations: "",
    currentUserLocation: "",
    canUseLocation: false,
    page: 0,
  };

  /*NOTE
  pagina 0: mappa
  pagina 1: info sponsor */

  componentDidMount() {
    this.locationPermissionAsync();
    this.downloadStation();
    // console.log("--------------")
    // console.log(this.props)
  }

  render() {
    switch (this.state.page) {
      case 0:
        return this.renderMap();
      case 1:
        return this.renderScreenSponsor();
    }
  }

  //FUNZIONE DI RENDER DELLA MAPPA
  renderMap = () => {
    return (
      <View style={STYLES.containerMap}>
        <Text>{this.state.requestStatus}</Text>
        <MapView
          showsUserLocation={this.state.canUseLocation}
          showsMyLocationButton={true}
          style={STYLES.map}
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
            //crea un array, dove per ogni parametro ha in 0 la position e in 1 tutto l'oggetto
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
          {Object.entries(Model.AllSponsor).map((s) => (
            //crea un array, dove per ogni parametro ha in 0 la position e in 1 tutto l'oggetto
            <Marker
              pinColor="blue"
              key={s[1].name}
              coordinate={{
                latitude: parseFloat(s[1].lat),
                longitude: parseFloat(s[1].lon),
              }}
              
              title={s[1].name}
              onPress={() => this.goToInfoSponsor(s)}
            ></Marker>
          ))}
          <Polyline
            coordinates={Object.entries(this.state.stations).map((x) => ({
              latitude: parseFloat(x[1].lat),
              longitude: parseFloat(x[1].lon),
            }))}
            strokeWidth={3}
          ></Polyline>
        </MapView>

        <TouchableOpacity
          style={STYLES.floatingButtonMap}
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

  //RENDER ESAME FEBBRAIO

  goToInfoSponsor = (sponsor) => {
    console.log("in go to info sponsor");
    this.state.sponsorSelected = sponsor;
    Model.SponsorSelected = sponsor;
    this.state.page = 1;
    this.setState(this.state);
  };

  renderScreenSponsor() {
    console.log("in render screen sponsor");
    //console.log(sponsor)
    return (
      <View>
        <StatusBar backgroundColor={COLORS.primaryColor} />
        <InfoSponsor
          onSelect={this.goBack}
          sponsor={this.state.sponsorSelected}
        ></InfoSponsor>
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
        alertNoConnection();
      });
  }

  goBack = () => {
    this.setState({ page: 0 });
  };
}

export default Map;
