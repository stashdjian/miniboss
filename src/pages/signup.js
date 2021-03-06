'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';




import Button from '../components/button';
import Header from '../components/header';

import Login from './login';

import Firebase from 'firebase';



import styles from '../styles/common-styles.js';

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });

    Firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).catch( (error) => {
      switch(error.code){

        case "EMAIL_TAKEN":
          alert("The new user account cannot be created because the email is already in use.");
        break;

        case "INVALID_EMAIL":
          alert("The specified email is not a valid email.");
        break;

        default:
          alert("Error creating user:" + error.message);
      }

    }).then(() => {
      alert('Your account was created!');
    });
    this.setState({
      email: '',
      password: '',
      loaded: true
    });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="MiniBoss Signup" loaded={this.state.loaded} />
        <View style={styles.body}>
          <View style={styles.bgImageWrapper}>
            <Image source={require('../../img/babyboss.jpg')} style={styles.bgImage} />
          </View>

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
              text="Signup"
              onpress={this.signup.bind(this)}
              button_styles={styles.primary_button}
              button_text_styles={styles.primary_button_text} />

            <Button
              text="Got an Account?"
              onpress={this.goToLogin.bind(this)}
              button_styles={styles.transparent_button}
              button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);
