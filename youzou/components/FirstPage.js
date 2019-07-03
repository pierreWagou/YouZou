import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, Image, Alert } from 'react-native'
import { Facebook } from 'expo'
import FbInfos from './FbInfos'

class FirstPage extends React.Component {
  myToken;
  render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../images/yuzus.png')}
          />
        </View>
    )
  }

  async logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync('1201406953372252', {
        permissions: ['public_profile', 'user_birthday', 'user_events', 'user_friends', 'user_link'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        myToken = token ;
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,picture.type(large),friends,events`)
        const { picture, name, birthday, friends, events} = await response.json()

        let userFbInfos = FbInfos.getInstance()
        userFbInfos._name = name
        userFbInfos._profilPicture = picture.data.url
        userFbInfos._birthday = birthday
        userFbInfos._friendList = friends
        userFbInfos._events = events

        return true;
      } else {
        Alert.alert('Error with Facebook')
        return false;
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  componentDidMount(){
    succeedToLog = this.logIn()
    if(succeedToLog){
      this.props.navigation.navigate('App')
    }
  }
}

 const styles = StyleSheet.create({
   container: {
     backgroundColor: 'rgba(111, 224, 113, 1)',
     width: '100%',
     height: '100%',
     justifyContent: 'center',
     alignItems: 'center'
   }
})

export default FirstPage
