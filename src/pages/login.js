'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  AsyncStorage,
  Text,
  TextInput
} from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';

import Firebase from 'firebase';

import styles from '../styles/common-styles.js';

export default class login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Login" loaded={this.state.loaded} />
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />

          <Button
            text="Login"
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text="New here?"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){

    this.setState({
      loaded: false
    });

    Firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).catch( (error) => {
      alert('Login Failed. Please try again');
    }).then( (user) => {
      this.setState({
        loaded: true
      });
      this.props.navigator.push({
        component: Account
      });
    });



  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}

AppRegistry.registerComponent('login', () => login);
