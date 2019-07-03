import React from 'react'
import {StyleSheet, Image} from 'react-native'
import {Icon} from 'react-native-elements'
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import GlobalMap from '../components/GlobalMap'
import FriendMap from '../components/FriendMap'
import Groups from '../components/Groups'
import Conversation from '../components/Conversation'
import PlaceDetail from '../components/PlaceDetail'
import FirstPage from '../components/FirstPage'
import CreationContact from '../components/CreationContact'

const mapStackNavigator = createStackNavigator({

  GlobalMap: {
    screen: GlobalMap,
    navigationOptions: {
      title: 'GlobalMap'
    }
  },
  FriendMap: {
    screen: FriendMap,
    navigationOptions: {
      title: 'FriendMap'
    }
  },
  PlaceDetail: {
    screen: PlaceDetail,
    navigationOptions: {
      title: "Lieu d'interêt"
    }
  },
  CreationContact: {
    screen: CreationContact,
    navigationOptions: {
      title: 'Création QG'
    }
  },
})

const groupsStackNavigator = createStackNavigator({
  Groups: {
    screen: Groups,
    navigationOptions: {
      title: 'Groupes'
    }
  },
  Conversation: {
    screen: Conversation,
    navigationOptions: {
      title: 'Notifications'
    }
  },
})


const appNavigator = createBottomTabNavigator({
  Map: {
    screen: mapStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='google-maps' type='material-community'/>
      }
    }
  },
  Groups: {
    screen: groupsStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Icon name='group' type='fontawesome'/>
      }
    }
  }
},
{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true
  }
})

const InitialNavigator = createSwitchNavigator({
  Splash: FirstPage,
   App: appNavigator
})

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
})

export default createAppContainer(InitialNavigator)
