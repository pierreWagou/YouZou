import React from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class MyPositionCallout extends React.Component {

  render() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.title_text}>{this.props.nom}</Text>
        <View style={styles.touchable}>
          <Text>Anniversaire:  {this.props.naissance}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    width: 200,
    height: 100
  },
  description:{
    flex:3,
    flexDirection:'column',
  },
  icons:{
    flex:3,
    flexDirection:'column',
    justifyContent:"space-between",
    alignItems:"stretch",
  },
  title_text:{
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap:'wrap',
    paddingRight: 5,
    textAlign: 'center',
    textAlignVertical:'center'
  },
  touchable:{
    flex:1,
    flexDirection:'row',
  },
})
