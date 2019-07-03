import React from 'react';
import { MapView} from 'expo';
import { Text, View, TextInput, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import moment from 'moment'
import { getLocation } from '../service/YouzouLocationService';
import FriendQGCallout from './FriendQGCallout'
import NewEventCallout from './NewEventCallout'
import EventDetails from './EventDetails'
import FbInfos from './FbInfos'

export default class FriendMap extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    contact: this.props.navigation.getParam("contact"),
    region: {
      latitude: this.props.navigation.state.params.place.coord.latitude,
      longitude: this.props.navigation.state.params.place.coord.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    },
    myPosition: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003
    },
    events: [],
    marker: undefined,
  }
}

addMarker(coordinate) {
  this.setState({
    marker: coordinate,
    region: {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    },
  })
}

iconOpacity(date) {
  const today = new Date()
  const eventDate = moment(date)
  const dif = eventDate.diff(today)
  const difDay = Math.abs(dif / 86400000)
  const opacity = 1 - difDay/31
  return(opacity)
}

displayPlaceDetail() {
  this.props.navigation.navigate("PlaceDetail", {contact: this.state.contact, coord: this.state.marker, onChangeQG: this.onChangeQG})
}

goConv() {
  this.props.navigation.navigate("Conversation", {contact: this.state.contact})
}

onChangeQG = data => {
  this.setState(data)
}

addUserPhoto() {
    let userFbInfos = FbInfos.getInstance();
    const fbPhoto = userFbInfos.getProfilPicture()
    return fbPhoto
  }

renderMyPosition() {
  let Image_Http_URL ={ uri: this.addUserPhoto()};
    return (
      <MapView.Marker
        coordinate={this.state.myPosition}
        title={"Mwa"}>
         <TouchableHighlight style={[styles.profileImgContainer, { borderColor: 'black', borderWidth:1 }]}>
            <Image source={Image_Http_URL} style={styles.profileImg} />
        </TouchableHighlight>
       </MapView.Marker>
     )
 }

renderQG() {
  return(
    <MapView.Marker
      coordinate={this.state.contact.qg.coord}
      title={this.state.contact.qg.nom}
      description={"QG de " + this.state.contact.nom}
      onCalloutPress={() => this.goConv()}>
      <View>
        <Icon
        name='castle'
        type='material-community'
        color={this.state.contact.color}/>
      </View>
      <MapView.Callout>
        <FriendQGCallout qg={this.state.contact.qg.nom} nom={this.state.contact.nom} color={this.state.contact.color}/>
      </MapView.Callout>
    </MapView.Marker>
  )
}

renderEvents() {
  const events = []
  const today = new Date()
  for(let i=0;i<this.state.contact.events.length;i++) {
    let eventDate = moment(this.state.contact.events[i].date)
    let dif = eventDate.diff(today)
    let difDay = Math.abs(dif / 86400000)
    if(difDay<31) {
      events.push(
        <MapView.Marker
          key={i}
          coordinate={this.state.contact.events[i].coord}
          title={this.state.contact.events[i].nom}
          description={this.state.contact.events[i].texte}>
          <View>
            <Icon
            iconStyle={{opacity: this.iconOpacity(this.state.contact.events[i].date)}}
            name='event'
            type='material'
            color={this.state.contact.color}/>
          </View>
          <MapView.Callout>
            <EventDetails nom={this.state.contact.events[i].nom} texte={this.state.contact.events[i].texte} date={this.state.contact.events[i].date} color={this.state.contact.color}/>
          </MapView.Callout>
        </MapView.Marker>
      )
    }
  }
  return events
}

renderMarker() {
  if(this.state.marker!=undefined) {
    return (
      <MapView.Marker
        coordinate={this.state.marker}
        title={"title"}
        description={"description"}
        pinColor={this.state.contact.color}
        onCalloutPress={() => this.displayPlaceDetail()}>
        <MapView.Callout>
          <NewEventCallout color={this.state.contact.color}/>
        </MapView.Callout>
      </MapView.Marker>
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

updateQG = qg => {
    this.setState({
      contact :{
        id: this.state.contact.id,
        nom: this.state.contact.nom,
        color: this.state.contact.color,
        qg: qg,
        events: this.state.contact.events,
        conversation: this.state.contact.conversation
      },
      marker:undefined
    })
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

render() {
  return(
    <View style={styles.container}>
      <MapView
        region={this.state.region}
        style={styles.mapView}
        initialRegion={this.state.region}
        onLongPress={(event) => this.addMarker(event.nativeEvent.coordinate)}>
        {this.renderMyPosition()}
        {this.renderQG()}
        {this.renderEvents()}
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

  updateUserPosition(location) {
    if(location.latitude!=undefined){
      this.setState({
        myPosition: {
          latitude: location.latitude,
          longitude: location.longitude
        },
      });
    }
  }

  componentDidMount() {
    getLocation().then(data => {
      this.updateUserPosition({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });

    navigator.geolocation.watchPosition(
      position => {
        this.updateUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
    },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1},
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapView: {
    flex: 1
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
    borderRadius: 40,
  },
})
