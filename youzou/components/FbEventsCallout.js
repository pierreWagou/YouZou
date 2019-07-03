import React from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class FbEventsCallout extends React.Component {

  render() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.title_text}>Facebook</Text>
        <View style={styles.touchable}>
          <Icon
          name='facebook'
          type='entypo'/>
          <Text>Afficher les évènemets Facebook</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    width: 250,
    height: 75
  },
  description:{
    flex:3,
    flexDirection:'column'
  },
  icons:{
    flex:3,
    flexDirection:'column',
    justifyContent:"space-between",
    alignItems:"stretch"
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
    flexDirection:'row'
  }
})
