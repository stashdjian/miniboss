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
  Image
} from 'react-native';


import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';

import Firebase from 'firebase';


export default class account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){
    this.setState({
      user: Firebase.auth().currentUser,
      loaded: true
    });
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
      Firebase.auth().signOut();
      this.props.navigator.push({
        component: Login
      });
    });

  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});
