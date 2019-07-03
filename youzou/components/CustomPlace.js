import React from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class CustomPlace extends React.Component {

  render() {
    return(
      <View style={styles.main_container}>
        <View style={styles.description}>
          <Text style={styles.title_text}>New Group</Text>
        </View>
        <View style={styles.icons}>
          <View style={styles.touchable}>
            <Icon
            name='castle'
            type='material-community'
            color='#517fa4'/>
            <Text> Set as QG </Text>
          </View>
          <View style={styles.touchable}>
            <Icon
              name='event'
              type='material'
              color='#517fa4'/>
            <Text> Set up an event </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    flex: 1
  },
  image:{
    flex:3,
    backgroundColor: 'gray'
  },
  description:{
    flex:3,
    flexDirection:'column',
  },
  rate:{ flex:2 },
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
