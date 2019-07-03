import React from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import Message from './Message'

export default class Conversation extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      contact: this.props.navigation.getParam('contact')
    }
  }

  _goMap = (contact, place) => {
    this.props.navigation.navigate("FriendMap", {contact: contact, place: place})
  }

  componentDidMount() {
    this.setState({contact: this.props.navigation.state.params.contact})
  }

  render() {
    return(
      <View style={styles.container}>
          <FlatList
            data={this.state.contact.conversation}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) =>
              <TouchableOpacity
                style={{backgroundColor: this.state.contact.color, marginTop:5}}
                onPress={() => this._goMap(this.state.contact, item)}>
                <Text style={{margin: 15, color:'white', fontWeight: 'bold'}}>
                  {item.texte}
                </Text>
              </TouchableOpacity>
            }
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})
