import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {Icon} from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import GlobalMap from '../components/GlobalMap'
import FriendMap from '../components/FriendMap'
import Groups from '../components/Groups'
import Conversation from '../components/Conversation'
import PlaceDetail from '../components/PlaceDetail'
import FirstPage from '../components/FirstPage'
import CreationContact from '../components/CreationContact'

const Stack = createStackNavigator()

function mapStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="GlobalMap">
      <Stack.Screen
        name="GlobalMap"
        component={GlobalMap}
        options={{ title: "GlobalMap"}}
      />
      <Stack.Screen
        name="FriendMap"
        component={FriendMap}
        options={{ title: "FriendMap"}}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetail}
        options={{ title: "Lieu d'interêt"}}
      />
      <Stack.Screen
        name="CreationContact"
        component={CreationContact}
        options={{ title: "Création QG"}}
      />
    </Stack.Navigator>
  )
}

function groupsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="GlobalMap">
      <Stack.Screen
        name="Groups"
        component={Groups}
        options={{ title: "Groupes"}}
      />
      <Stack.Screen
        name="Conversation"
        component={Conversation}
        options={{ title: "Notifications"}}
      />
    </Stack.Navigator>
  )
}

const BotttomTab = createBottomTabNavigator()

function appNavigator() {
  return(
    <BotttomTab.Navigator initialRouteName="Map">
      <BotttomTab.Screen
        name="Map"
        component={mapStackNavigator}
      />
      <BotttomTab.Screen
        name = "Groups"
        component={groupsStackNavigator}
      />
    </BotttomTab.Navigator>
  )
}

// const appNavigator = createBottomTabNavigator({
//   Map: {
//     screen: mapStackNavigator,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <Icon name='google-maps' type='material-community'/>
//       }
//     }
//   },
//   Groups: {
//     screen: groupsStackNavigator,
//     navigationOptions: {
//       tabBarIcon: () => {
//         return <Icon name='group' type='fontawesome'/>
//       }
//     }
//   }
// },
// {
//   tabBarOptions: {
//     activeBackgroundColor: '#DDDDDD',
//     inactiveBackgroundColor: '#FFFFFF',
//     showLabel: false,
//     showIcon: true
//   }
// })

// const InitialNavigator = createSwitchNavigator({
//   Splash: FirstPage,
//    App: appNavigator
// })

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

// export default createAppContainer(InitialNavigator)
export default function App() {
  return(
    <NavigationContainer>
      {appNavigator()}
    </NavigationContainer>
  )
}
