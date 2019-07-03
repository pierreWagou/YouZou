import React from 'react';
import { StyleSheet, Text, View, Image , TextInput, Button, FlatList} from 'react-native';
import ContactItem from './ContactItem'
import contacts from '../helpers/contactsData'

export default class Groups extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      contacts: contacts
    }
  }

  _displayConversation = (contact) => {
    this.props.navigation.navigate("Conversation", {contact: contact})
  }

  _goQG = (contact, place) => {
    this.props.navigation.navigate("FriendMap", {contact: contact, place: place})
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.contacts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <ContactItem
              contact={item}
              displayConversation={this._displayConversation}
              goQG={this._goQG}/>
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    width: 500
  },
  list: {
    flex: 1
  }
})
