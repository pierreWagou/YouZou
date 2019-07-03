import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {Icon} from 'react-native-elements'

export default class EventDetails extends  React.Component{

  render(){
    return(
      <View style={styles.main_container}>
        <Text style={styles.title}>{this.props.nom}</Text>
        <View style={styles.description}>
          <Icon
          name='message'
          type='pencil-square-o'
          color={this.props.color}/>
        <Text style={{flex:1, flexWrap:'wrap'}} numberOfLines={2}>  {this.props.texte}</Text>
        </View>
        <View style={{flexDirection:'row', flex:1}}>
          <Icon
          name='date-range'
          type='material'
          color={this.props.color}/>
          <Text>  {this.props.date}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    width: 300,
    height: 150
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap:'wrap',
    paddingRight: 5,
    textAlign: 'center',
    textAlignVertical:'center'
  },
  description:{
    flex: 1,
    flexDirection:'row'
  }
})
