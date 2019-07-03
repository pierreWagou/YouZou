import React from 'react'
import { StyleSheet, Text, View, Image , TextInput, Button, FlatList,TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'
import Conversation from './Conversation'

export default class ContactItem extends React.Component{

  render(){
    const {contact, displayConversation, goQG} = this.props
    const last = contact.conversation.length - 1
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchableOpacity}
          onPress={() => goQG(contact, contact.qg)}>
          <Icon
          name='castle'
          type='material-community'
          color={contact.color}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.info} onPress={() => displayConversation(contact)}>
          <Text style={styles.name}>{contact.nom}</Text>
          <Text style={styles.preview} numberOfLines={1}>{contact.conversation[last].texte}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    margin: 5,
  },
  info: {
    flex: 5,
    flexDirection:'column',
    margin: 5,
  },
  name:{
    flex:1,
    fontWeight: 'bold',
    fontSize: 15
  },
  preview: {
    flex:1,
    margin: 5,
  },
  touchableOpacity: {
    borderWidth:1,
     borderColor:'rgba(0,0,0,0.2)',
     alignItems:'center',
     justifyContent:'center',
     width:70,
     height:70,
     backgroundColor:'#fff',
     borderRadius:50,
  }
});
