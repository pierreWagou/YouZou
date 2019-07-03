import React from 'react';
import {Text, View, TextInput, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class CreationContact extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      conv: "",
      qg: "",
      color: "black"
    }
  }

  createGroup() {
    let contact = {
      id: 1,
      nom: this.state.conv,
      color: this.state.color,
      qg: {
        nom: this.state.qg,
        coord: this.props.navigation.state.params.coord
      },
      events: [],
      conversation: [{
        id: 1,
        texte: "Bienvenue dans le QG " + this.state.qg + " de " + this.state.conv
      }]
    }
    this.props.navigation.state.params.onCreateGroup(contact)
    this.props.navigation.goBack()
  }

  textInputChanged(name, text) {
    this.setState({[name]: text})
  }

  changeColor(color) {
    this.setState({color: color})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.textInputChanged("conv", text)}
          placeholder="Nom de la conversation"/>
        <TextInput
          style={styles.textinput}
          onChangeText={(text) => this.textInputChanged("qg", text)}
          placeholder="Nom du QG"/>
        <View style={styles.colors}>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("blue")}>
            <Icon name='castle' type='material-community' color="blue"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("red")}>
            <Icon name='castle' type='material-community' color="red"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("green")}>
            <Icon name='castle' type='material-community' color="green"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("yellow")}>
            <Icon name='castle' type='material-community' color="yellow"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("cyan")}>
            <Icon name='castle' type='material-community' color="cyan"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("pink")}>
            <Icon name='castle' type='material-community' color="pink"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("purple")}>
            <Icon name='castle' type='material-community' color="purple"/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.changeColor("orange")}>
            <Icon name='castle' type='material-community' color="orange"/>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          onPress={() => this.createGroup()}
          color={this.state.color}
          title="Créer QG"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  textinput: {
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    height:50,
    borderColor:'#000000',
    borderWidth:2,
    paddingLeft:5
  },
  colors: {
    flexDirection: "row",
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    marginLeft:5,
    marginRight:5,
    marginTop: 10,
    height: 50
  },
  touchableOpacity: {
    borderWidth:1,
     borderColor:'rgba(0,0,0,0.2)',
     alignItems:'center',
     justifyContent:'center',
     width:50,
     height:50,
     backgroundColor:'#fff',
     borderRadius:50,
  }
})
