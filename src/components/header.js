'use strict';
import React, {
  Component
} from 'react';

import {
  AppRegistry,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';

export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
          <Text style={styles.header_text}>{this.props.text}</Text>
        </View>
        <View style={styles.header_item}>
        {  !this.props.loaded &&
            <GiftedSpinner />
        }
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#333'
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#FFF',
    fontSize: 18
  }
});

AppRegistry.registerComponent('header', () => header);
