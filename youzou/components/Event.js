import React from 'react'
import {View, Text, StyleSheet, TextInput, Image, Button, TouchableOpacity} from 'react-native'
import DatePicker from 'react-native-datepicker'
import TimePicker from "react-native-24h-timepicker";
import {Icon} from 'react-native-elements';

export default class Event extends  React.Component{

  constructor(props){
    super(props);
    this.contact = this.props.navigation.getParam("contact")
    this.state= {
      name:"",
      description:"",
      date:"2019-06-14"
    }
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
  }

  changeQG() {
    let newQg = {
      nom:this.state.name,
      coord:this.props.navigation.state.params.marker
    }
    this.props.navigation.state.params.updateQG(newQg)
    this.props.navigation.goBack()
  }

  confirmEvent() {
    let {contact} = this
    let newEvent = {
      coord : this.props.navigation.state.params.marker,
      nom: this.state.name,
      texte: this.state.description,
      date: this.state.date
    }
    contact.events = [...contact.events, newEvent]
    this.props.navigation.state.params.updateEvents({contact: this.contact, markers: undefined})
    this.props.navigation.goBack()
  }


  render(){
    const contact = this.props.navigation.state.params.contact
    return(
      <View style={styles.main_container}>
        <View style={styles.main_container}>
          <View style={styles.name_container}>
            <TextInput
              style={styles.textinput}
              onChangeText={(text) => this.setState({name: text})}
              placeholder="Entrez un nom"/>
              <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeQG()}>
              <Icon name='castle' type='material-community' color={contact.color}/>
              </TouchableOpacity>
          </View>

            <TextInput style={styles.description}
            placeholder="Description de l'évènement"
            onChangeText={(text) => this.setState({description: text})} />

            <View style={{marginLeft:5,
            marginRight:5,
            marginTop: 10}}>
            <DatePicker
              style={{width: 280}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate="2030-12-31"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {position: 'absolute', left: 0, top: 4, marginLeft: 300},
                dateInput: {borderWidth:2,borderColor:'#000000'}
              }}
              onDateChange={(date) => {this.setState({date: date})}}
              />
            </View>
            <View style={{marginLeft:5,
            marginRight:5,
            marginTop: 10,}}>
            <Button title="Valider"
            color="#000000"
            onPress={()=> this.confirmEvent()}
            />
            </View>
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
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    height:50,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5,
    width:280
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
    flexDirection:'row'
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
    fontSize: 20
  }
})
