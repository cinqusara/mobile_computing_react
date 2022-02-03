/* TODO inserire
- bottone per modificare foto
- bottone per modificare nome
*/


import React from 'react';
import { Component } from 'react';
import { FlatList, StyleSheet, View, SafeAreaView, Button, Text } from 'react-native';
import { Avatar, Title, Caption, TouchableRipple } from 'react-native-paper'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Profilo extends Component {
    state = {
        navigation: this.props.navigation,
        uriImg: 'https://www.shareicon.net/data/512x512/2016/09/15/829452_user_512x512.png'
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.userInfoSection}>
                    <Avatar.Image
                        source={{
                            uri: this.state.uriImg,
                        }}
                        size={80}
                    />
                </View>
                <View>
                    <Text>change image</Text>
                </View>
                <View> 
                    <Title style={styles.title}>Sofia Verdi</Title>
                    <Caption style={styles.caption}>@soverdi</Caption>
                </View>
            </SafeAreaView>
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
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});

export default Profilo;