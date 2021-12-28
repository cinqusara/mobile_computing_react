import React from 'react';
import { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

class Tratte extends Component {
    state = {
        navigation: this.props.navigation,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    onPress={() => alert('This is "Bacheca" screen.')}
                    style={styles.textBold}
                >Tratte Screen</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textBold: {
        fontWeight: "bold"
    }
});


export default Tratte;