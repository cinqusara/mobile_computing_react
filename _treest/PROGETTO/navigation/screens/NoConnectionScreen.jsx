import React from "react";
import { Text, View, Image } from "react-native";
import { STYLES } from "../../utilities/styles/MyStyles";

const NoConnectionScreen = () => {
  return (
    <View style={STYLES.container2}>
      <Image
        source={require("../../public/noConnection.png")}
        style={STYLES.imgNoConnection}
        resizeMode="contain"
      />
      <Text style={STYLES.title}> No Connection</Text>
    </View>
  );
};

export default NoConnectionScreen;
