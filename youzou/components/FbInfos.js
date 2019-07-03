import React from 'react'
import {Image} from 'react-native'

  class FbInfos  {

    static myInstance = null;

    _name
    _profilPicture
    _birthday
    _friendList
    _events

    static getInstance() {
    if (FbInfos.myInstance == null) {
        FbInfos.myInstance = new FbInfos()
    }
    return this.myInstance
    }

    getNom() {
      console.log(this._name)
      return this._name
    }

    getProfilPicture() {
      return this._profilPicture
    }

    getBirthday() {
      console.log(this._birthday)
      return this._birthday
    }

    getEvents() {
      return this._events
    }

    //retourne le Tableau d'évènement de la personne
    getEventsTable() {
      eventTable = new Array();
      for (var i in this._events.data) {
        eventTable[i] = this._events.data[i]
      }
      return eventTable;
    }

    getProfilPicture() {
      return this._profilPicture;
    }

  }




export default FbInfos
