'use strict';
import {
  StyleSheet
} from 'react-native';

module.exports = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 9,
    alignItems: 'stretch',
    backgroundColor: '#151C1F',
    padding: 10
  },
  textinput: {
    height: 40,
    marginBottom: 3,
    marginTop: 3,
    backgroundColor: '#FFF'
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#0485A9',
    fontSize: 16
  },
  primary_button: {
    marginBottom: 3,
    marginTop: 3,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'center'
  },
  bgImageWrapper: {
      position: 'relative',
      marginRight:10
  },
  bgImage: {
      resizeMode: "stretch"
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10
  }
});
