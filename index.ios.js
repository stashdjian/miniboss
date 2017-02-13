'use strict';
import React, {
  Component,
  Text
} from 'react';

import {
  AppRegistry,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import Signup from './src/pages/signup';
import Account from './src/pages/account';

import Header from './src/components/header';

import Firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAQf6_cTJ6pd18rhlQTEeQY6vRbqqlDCyQ",
  authDomain: "miniboss-925d5.firebaseapp.com",
  databaseURL: "https://miniboss-925d5.firebaseio.com",
  storageBucket: "miniboss-925d5.appspot.com",
  messagingSenderId: "352047977760"
};
let app = Firebase.initializeApp(config);

import styles from './src/styles/common-styles.js';

class miniboss extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {

      let component = {component: Signup};
      let User = Firebase.auth().currentUser;
      if(User){
        this.setState({component: Account});
      }else{
        this.setState(component);
      }
    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}

AppRegistry.registerComponent('miniboss', () => miniboss);
