import * as React from 'react';
import { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

//import per navigation
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

//import screens
import Bacheca from './screens/Bacheca';
import Tratte from './screens/Tratte';
import Profilo from './screens/Profilo';

//const for screen
const bacheca = 'Bacheca';
const tratte = 'Tratte';
const profilo = 'Profilo';

//const Tab
const Tab = createBottomTabNavigator();


class MainContainer extends Component {

    state = {
        primoAvvio: this.props.primoAvvio,
    }

    render() {
        if (this.state.primoAvvio == true) {
            return (this.renderNavigator(tratte))
        }else{
            return (this.renderNavigator(bacheca))
        }
    }

    renderNavigator(primaPagina) {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={primaPagina} //radice da dove parte la navigationbar
                    screenOptions={({ route }) => ({ //route = location dove siamo ora
                        tabBarIcon: ({ focused, color, size }) => { //specifichiamo colore, size etc. dell'icona
                            let iconName;
                            let routeName = route.name;

                            if (routeName === tratte) {
                                iconName = focused ? 'list' : 'list-outline' //if ternario --> se icon name è su 'focused' prende l'icona home, altrimenti 'home-outline'
                            } else if (routeName === bacheca) {
                                iconName = focused ? 'grid' : 'grid-outline'
                            } else if (routeName === profilo) {
                                iconName = focused ? 'person' : 'person-outline'
                            }

                            return <Ionicons name={iconName} size={size} color={color} />
                        },
                        tabBarInactiveTintColor: "grey",
                        tabBarActiveTintColor: "green",
                        labelStyle: { paddingBottom: 10, fontSize: 10 },
                        style: { padding: 10, height: 70 }
                    })}>
                    <Tab.Screen name={tratte} component={Tratte} />
                    <Tab.Screen name={bacheca} component={Bacheca} />
                    <Tab.Screen name={profilo} component={Profilo} />

                </Tab.Navigator>
            </NavigationContainer>
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
export default MainContainer