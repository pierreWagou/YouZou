import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

export default class Message extends React.Component {

  render() {
    const {message, contact, goMap} = this.props
    const place = "lol"
    return(
      <TouchableOpacity style={{flex: 1, margin: 20, backgroundColor: contact.color}} onPress={() => goMap(contact, message)}>
        <Text>{message.texte}</Text>
      </TouchableOpacity>
    )
  }
}
