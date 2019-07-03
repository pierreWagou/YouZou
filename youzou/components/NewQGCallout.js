import React from 'react'
import {View,Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Icon} from 'react-native-elements'

export default class NewQGCallout extends React.Component {

  render() {
    return(
      <View style={styles.main_container}>
        <Text style={styles.title_text}>Nouveau QG</Text>
        <View style={styles.touchable}>
          <Icon
            name='castle'
            type='material-community'
            color={this.props.color}/>
          <Text>Créer un nouveau QG</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container:{
    flex: 1
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
