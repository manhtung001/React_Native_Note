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
} from 'react-native';

import {
  listPending,
  listShipping,
  listShipped,
  Profile,
  NotificationScreen
} from './../screens/index';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Color from '../constants/Color';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const TopTabScreen = ({ route }) => {
  return (
    <TopTab.Navigator
      initialRouteName="listPending"
      tabBarOptions={{
        activeTintColor: Color.Primary,
        inactiveTintColor: Color.GRAY,
        indicatorStyle: { backgroundColor: Color.Primary },
        scrollEnabled: true
      }}
      lazy={true}
      swipeEnabled={true}
      
    >
      <TopTab.Screen name="Đang chờ" component={listPending} />
      <TopTab.Screen name="Đang giao" component={listShipping} />
      <TopTab.Screen name="Đã giao" component={listShipped} />
      <TopTab.Screen name="Cá nhân" component={Profile} />
    </TopTab.Navigator>
  );
}


const RootTab = ({ route }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <BottomTab.Navigator
          initialRouteName="TopTabScreen"
          tabBarOptions={{
            activeTintColor: Color.Primary,
            inactiveTintColor: Color.GRAY,
          }}
        >
          <BottomTab.Screen
            name="TopTabScreen"
            component={TopTabScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <View>
                  <Icon
                    size={30}
                    name="home"
                    color={focused ? Color.Primary : Color.GRAY}
                  />
                </View>
              ),
              tabBarLabel: 'Home',
            }}
          />
          <BottomTab.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                <Icon
                  size={30}
                  color={focused ? Color.Primary : Color.GRAY}
                  name="bell"
                />
              ),
              tabBarLabel: 'Notification',
            }}
          />
        </BottomTab.Navigator>

      </View>
    </SafeAreaView>
  );
}


export default RootTab;
