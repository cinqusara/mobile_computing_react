import React from 'react';
import { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

class Map extends Component {
    state = {
    }

    render() {
        return (
            <View>
               <Text>Mappa</Text>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
    },
    textBold: {
        fontWeight: "bold"
    }
});

export default Map;