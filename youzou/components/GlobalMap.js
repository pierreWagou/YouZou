import React from 'react';
import MapView from 'react-native-maps'
import { Marker, Callout} from 'react-native-maps';
import {Text, View, TextInput, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from 'moment'
import { getLocation } from '../service/YouzouLocationService';
import NewQGCallout from './NewQGCallout'
import EventDetails from './EventDetails'
import GlobalQGCallout from './GlobalQGCallout'
import contacts from '../helpers/contactsData'
import FbInfos from './FbInfos'
import FbEventsCallout from './FbEventsCallout'

export default class GlobalMap extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    contact: contacts,
    region: {
      latitude: 49.415240,
      longitude: 2.819094,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    },
    myPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    },
    markers: undefined,
    fbEvents: [],
    userInfo: {
      nom: undefined,
      naissance: undefined
    }
  }
}

addFbEvents() {
  if(this.state.fbEvents.length==0) {
    let userFbInfos = FbInfos.getInstance();
    const temp = userFbInfos.getEventsTable();
    let fbEvents = [];
    for(let i=0;i<temp.length;i++){
      if(temp[i].place!=undefined && temp[i].place.location!=undefined && temp[i].place.location.latitude!=undefined){
        fbEvents.push(temp[i]);
      }
    }
    this.setState({fbEvents: fbEvents})
  }
}
addMarker(coordinate) {
  this.setState({
    marker: coordinate,
    region: {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    }
  })
  let userFbInfos = FbInfos.getInstance();
  const nom = userFbInfos.getNom()
  console.log(nom)
}

onCreateGroup = data => {
  this.setState({contact: [...this.state.contact, data], marker: undefined})
}

displayCreationContact = () => {
  this.props.navigation.navigate("CreationContact", {coord: this.state.marker, onCreateGroup: this.onCreateGroup})
}

goConv(contact) {
  this.props.navigation.navigate("FriendMap", {contact: contact, place: contact.qg})
}

iconOpacity(date) {
  const today = new Date()
  const eventDate = moment(date)
  const dif = eventDate.diff(today)
  const difDay = Math.abs(dif / 86400000)
  const opacity = 1 - difDay/31
  return(opacity)
}

renderMyPosition() {
  let Image_Http_URL ={ uri: this.addUserPhoto()}
  return (
    <Marker
      coordinate={this.state.myPosition}
      onCalloutPress={() => this.addFbEvents()}
      title={"mwa"}>
      <TouchableHighlight style={[styles.profileImgContainer, { borderColor: 'black', borderWidth:1 }]}>
        <Image source={Image_Http_URL} style={styles.profileImg} />
      </TouchableHighlight>
      <Callout>
        <FbEventsCallout/>
      </Callout>
     </Marker>
   )
 }

renderQG() {
  const qgs = []
  for(let i=0;i<this.state.contact.length;i++) {
    qgs.push(
      <Marker
        key={i}
        coordinate={this.state.contact[i].qg.coord}
        title={this.state.contact[i].qg.nom}
        description={"QG de " + this.state.contact[i].nom}
        onCalloutPress={() => this.goConv(this.state.contact[i])}>
        <View>
          <Icon
          name='castle'
          type='material-community'
          color={this.state.contact[i].color}/>
        </View>
        <Callout>
          <GlobalQGCallout qg={this.state.contact[i].qg.nom} nom={this.state.contact[i].nom} color={this.state.contact[i].color}/>
        </Callout>
      </Marker>
    )
  }
  return qgs
}

renderEvents() {
  const events = []
  const today = new Date()
  for(let i=0;i<this.state.contact.length;i++) {
    for(let j=0;j<this.state.contact[i].events.length;j++) {
      let eventDate = moment(this.state.contact[i].events[j].date)
      let dif = eventDate.diff(today)
      let difDay = Math.abs(dif / 86400000)
      if(difDay<31) {
        events.push(
          <Marker
            key={this.state.contact[i].events[j].nom}
            coordinate={this.state.contact[i].events[j].coord}
            title={this.state.contact[i].events[j].nom}
            description={this.state.contact[i].events[j].texte}>
            <View>
              <Icon
              iconStyle={{opacity: this.iconOpacity(this.state.contact[i].events[j].date)}}
              name='event'
              type='material'
              color={this.state.contact[i].color}/>
            </View>
            <Callout>
              <EventDetails
              nom={this.state.contact[i].events[j].nom}
              texte={this.state.contact[i].events[j].texte}
              date={this.state.contact[i].events[j].date}
              color={this.state.contact[i].color}/>
            </Callout>
          </Marker>
        )
      }
    }
  }
  for(let i=0;i<this.state.fbEvents.length;i++) {
    let eventDate = moment(this.state.fbEvents[i].start_time)
    let dif = eventDate.diff(today)
    let difDay = Math.abs(dif / 86400000)
    if(difDay<31) {
      events.push(
        <Marker
          key={this.state.fbEvents[i].name}
          coordinate={{latitude: this.state.fbEvents[i].place.location.latitude, longitude: this.state.fbEvents[i].place.location.longitude}}
          title={this.state.fbEvents[i].name}
          description={this.state.fbEvents[i].description}>
          <View>
            <Icon
            iconStyle={{opacity: this.iconOpacity(this.state.fbEvents[i].start_time)}}
            name='event'
            type='material'
            color='black'/>
          </View>
          <Callout>
            <EventDetails nom={this.state.fbEvents[i].name} texte={this.state.fbEvents[i].description} date={this.state.fbEvents[i].start_time}/>
          </Callout>
        </Marker>
      )
    }
  }
  return events;
}

renderMarker() {
  if(this.state.marker!=undefined) {
    return (
      <Marker
        coordinate={this.state.marker}
        title={"title"}
        description={"description"}
        pinColor={'#000000'}
        onCalloutPress={() => this.displayCreationContact()}>
        <Callout>
          <NewQGCallout/>
        </Callout>
      </Marker>
    )
  }
}

updateState(location) {
  this.setState({
    region: {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    }
  })
}

updateUserPosition(location) {
  if(location.latitude!=undefined){
    this.setState({
      myPosition: {
        latitude: location.latitude,
        longitude: location.longitude
      }
    })
  }
}

componentDidMount() {
  getLocation().then(data => {
    this.updateState({
      latitude: data.latitude,
      longitude: data.longitude,
    })
    this.updateUserPosition({
      latitude: data.latitude,
      longitude: data.longitude,
    })
  });

  navigator.geolocation.watchPosition(
    position => {
      this.updateUserPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
  },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1}
    )


}

getCoordsFromName(loc) {
  this.updateState({
    latitude: loc.lat,
    longitude: loc.lng,
  });
  this.addMarker({latitude: loc.lat, longitude: loc.lng})
}

onMapRegionChange(region) {
  this.setState({ region })
}

addUserPhoto() {
    let userFbInfos = FbInfos.getInstance();
    const fbPhoto = userFbInfos.getProfilPicture()
    return fbPhoto
  }


render() {
  return(
    <View style={styles.container}>
      <MapView
        region={this.state.region}
        style={styles.mapView}
        initialRegion={this.state.region}
        onLongPress={(event) => this.addMarker(event.nativeEvent.coordinate)}>
        {this.renderEvents()}
        {this.renderMyPosition()}
        {this.renderQG()}
        {this.renderMarker()}
      </MapView>
      <View style={styles.input}>
        <GooglePlacesAutocomplete
          placeholder='Search'
          minLength={2}
          autoFocus={true}
          returnKeyType={'search'}
          listViewDisplayed={false}
          fetchDetails={true}
          onPress={(data, details = null) => this.getCoordsFromName(details.geometry.location)}
          query={{key: 'AIzaSyBwYeSVao6P9u5-oWI3-WTOE40LOf4ZnnE', language: 'en'}}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={200}/>
      </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1
  },
  imageContainer:{
    height: '10',
    width: '10'
  },
  input: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-around'
  },
  profileImgContainer: {
    marginLeft: 8,
    height: 30,
    width: 30,
    borderRadius: 40,
    overflow: 'hidden'
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 40
  }
})
