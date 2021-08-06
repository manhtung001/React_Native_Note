/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import helpers from '../../globals/helpers';

const Profile = (props) => {

  const logout = () => {
    helpers.showComfirm({
      title:'TB',
      content:'Ban co cahc chan muon dx?',
      textOk:'DX',
      textCancer:'Close',
      onOk:()=>{
        helpers.clearUser()
        props.navigation.navigate('LoginScreen')
      }
    })
    
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>
      <SafeAreaView />
      <Text>{props.userInfo.name}</Text>
      <Text>{props.userInfo.phone}</Text>
      <TouchableOpacity
        style={{
          width: "80%",
          backgroundColor: "#fb5b5a",
          borderRadius: 25,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 40,
          marginBottom: 10
        }}
        onPress={() => logout()}
      >
        <Text style={{color: "white"}} >LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => ({ userInfo: state.userState?.user, token: state.userState?.token })


export default connect(mapStateToProps)(Profile);
