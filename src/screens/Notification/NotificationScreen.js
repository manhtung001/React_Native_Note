/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';

const NotificationScreen = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <SafeAreaView />
        <Text>NotificationScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({

});

export default NotificationScreen;
