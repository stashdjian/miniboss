'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  View,
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
  Image
} from 'react-native';


import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

import firebase from 'firebase';

import RNFetchBlob from 'react-native-fetch-blob';

var ImagePicker = require('react-native-image-picker');

export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
      userProfile: {nickname:''},
    }

  }

  componentWillMount(){
    let user = firebase.auth().currentUser;
    firebase.database().ref('/users/' + user.uid).on('value', (snapshot) => {
      let userProfile = snapshot.val();
      if (!userProfile) {
        userProfile = {nickname:''};
      }

      this.setState({
        user: firebase.auth().currentUser,
        userProfile: userProfile,
        loaded: true
      });

      var imageRef = firebase.storage().ref('avatars').child(this.state.user.uid);

      imageRef.getDownloadURL().then(function(url) {
        this.setState({
          user: {photoURL: url}
        });
      }.bind(this)).catch((error)=>{console.log(error)});

    })
  }

  update(){
    var userRef = firebase.database().ref('users/' + this.state.user.uid);
    userRef.update({ nickname: this.state.userProfile.nickname });
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>
                {
                  this.state.user.photoURL &&
                  <Image
                    style={styles.image}
                    source={{uri: this.state.user.photoURL}}
                  />
                }
              <Button
                  text="Pick Avatar"
                  onpress={this._takePicture.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />
              <TextInput
                style={styles.textinput}
                onChangeText={(text) => this.setState({userProfile:{nickname: text}})}
                value={this.state.userProfile.nickname}
                placeholder={"Nickname"}
              />
              <Button
                  text="Update Profile"
                  onpress={this.update.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />

              <Button
                  text="Logout"
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />

            </View>
        }
        </View>
      </View>
    );
  }

  logout(){
    AsyncStorage.removeItem('user_data').then(() => {
      firebase.auth().signOut();
      this.props.navigator.push({
        component: Login
      });
    });
  }

  _takePicture = () => {
    var options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
        let source = { uri: response.uri };
        uploadAvatar(response.uri, this.state.user.uid).then((url)=>{
          this.setState({
            user: {photoURL: url}
          });
        });
      }
    });
  }
}

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadAvatar = (uri, userId, mime = 'image/jpg') => {
  return new Promise((resolve, reject) => {
    var platform = 'ios';
    const uploadUri = platform === 'ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebase.storage().ref('avatars').child(userId)
      fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
