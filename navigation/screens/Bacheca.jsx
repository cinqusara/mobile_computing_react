import React from 'react';
import { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

class Bacheca extends Component {
    state = {
        navigation: this.props.navigation,
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    //onPress={() => navigation.navigate('Tratte')}
                    style={styles.textBold}
                >Bacheca</Text>
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

export default Bacheca;