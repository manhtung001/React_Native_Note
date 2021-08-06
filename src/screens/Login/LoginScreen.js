/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import helpers from './../../globals/helpers';

import dataService from './../../network/dataService';


const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [passWord, setPassWord] = useState('');

  const login = async (phone, passWord, token) => {
    let data = {
      phone: '0356798938',
      password: '123456'
    }
    helpers.showLoading()
    let res = await helpers.login(data);
    helpers.hideModal()
    if (res.code == 0) {
      navigation.replace('RootTab');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MEGA SHIP</Text>
      <View style={styles.inputView} >
        <TextInput
          style={styles.inputText}
          placeholder="phone..."
          placeholderTextColor="#003f5c"
          autoCorrect={false}
          onChangeText={text => setPhone(text)}
        />
      </View>
      <View style={styles.inputView} >
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          autoCorrect={false}
          onChangeText={text => setPassWord(text)}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          login(phone, passWord);
        }}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={{ color: "#fb5b5a" }}>Signup</Text>
      </TouchableOpacity>


    </View>
  );
}

export default LoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderWidth: 2,
    borderColor: "#ededed"
  },
  inputText: {
    height: 50,
    color: "black"
  },
  forgot: {
    color: "#fb5b5a",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  }
});

