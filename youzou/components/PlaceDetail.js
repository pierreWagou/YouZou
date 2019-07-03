import React from 'react'
import {View,Text, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-datepicker'
import {Icon} from 'react-native-elements'

export default class PlaceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.contact = this.props.navigation.getParam("contact")
    this.nom = ""
    this.texte = ""
    this.date = "2019-06-14"
  }

  setQG() {
    let {contact} = this
    const newMessage = {
      id: contact.conversation.length,
      texte:"Le QG a été déplacé à " + this.nom,
      coord: {
      latitude: this.props.navigation.state.params.coord.latitude,
      longitude: this.props.navigation.state.params.coord.longitude
      }
    }
    contact.qg = {
      nom : this.nom,
      coord: {
        latitude: this.props.navigation.state.params.coord.latitude,
        longitude: this.props.navigation.state.params.coord.longitude
      }
    }
    contact.conversation = [...contact.conversation, newMessage]
    this.props.navigation.state.params.onChangeQG({contact: this.contact, marker: undefined})
    this.props.navigation.goBack()
  }

  createEvent() {
    let {contact} = this
    const newMessage = {
      id: contact.conversation.length,
      texte:"Nouvel Evènement le " + this.date + " : " + this.nom+ ". " + this.texte,
      coord: {
        latitude: this.props.navigation.state.params.coord.latitude,
        longitude: this.props.navigation.state.params.coord.longitude
      }
    }
    let newEvent = {
      id: contact.events.length,
      coord: {
        latitude: this.props.navigation.state.params.coord.latitude,
        longitude: this.props.navigation.state.params.coord.longitude
      },
      nom: this.nom,
      texte: this.texte,
      date: this.date
    }
    contact.events = [...contact.events, newEvent]
    contact.conversation = [...contact.conversation, newMessage]
    this.props.navigation.state.params.onChangeQG({contact: this.contact, marker: undefined})
    this.props.navigation.goBack()
  }

  render() {
    const contact = this.props.navigation.state.params.contact
    return(
      <View style={styles.main_container}>
          <View style={styles.name_container}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.nom=text}
              placeholder="Entrez un nom"/>
            <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.setQG()}>
              <Icon
                name='castle'
                type='material-community'
                color={contact.color}/>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.description}
            multiline={true}
            placeholder="Description de l'évènement"
            onChangeText={(text) => this.texte=text} />
          <View style={{marginLeft:5, marginRight:5, marginTop: 10,}}>
            <DatePicker
              style={styles.datePicker}
              date={this.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate="2030-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{dateIcon: {position: 'absolute', left: 0, top: 4, marginLeft: 300,}, dateInput: {borderWidth:2,borderColor:'#000000',}}}
              onDateChange={(date) => this.date = date}/>
          </View>
          <View style={{marginLeft:5, marginRight:5, marginTop: 10,}}>
          <Button title="Créer évènement"
            color={contact.color}
            onPress={()=> this.createEvent()}/>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    flex:1,
    flexDirection:'column'
  },
  textinput: {
    flex: 5,
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    height:50,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5
  },
  touchableOpacity: {
    borderWidth:1,
     borderColor:'rgba(0,0,0,0.2)',
     alignItems:'center',
     justifyContent:'center',
     width:50,
     height:50,
     backgroundColor:'#fff',
     borderRadius:60,
     marginLeft:5,
     marginRight:5,
     marginTop: 10
  },
  name_container:{
    flexDirection:'row',
  },
  description:{
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    height:150,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5
  },
  text:{
    fontSize: 20,
  },
  datePicker: {
    width: 280
  }
})
