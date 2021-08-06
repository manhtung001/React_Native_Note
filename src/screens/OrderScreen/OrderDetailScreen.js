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
  Alert,
  Image,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from '../../constants/Color';
import Icon from 'react-native-vector-icons/Ionicons';


const OrderDetailScreen = (props) => {

  const data = props.route.params.res.data.productOrderInfo;
  const { status } = props.route.params;
  const product = props.route.params.item;
  console.log(product)


  const acceptOrder = async (id) => {
    let res = await dataService.shipperAcceptOrder({
      orderId: id
    })
    Alert.alert(res.message);
    if (res.code == 0) {
      props.navigation.goBack();
    }
  }

  const shippedOrder = async (id) => {
    let res = await dataService.shipperShippedOrder({
      orderId: id
    })
    Alert.alert(res.message);
    if (res.code == 0) {
      props.navigation.goBack();
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView />
      <TouchableOpacity
       style={styles.backBtn}
       onPress={() => props.navigation.goBack()}
       >
        <Icon
          size={30}
          name="arrow-back"
          color={Color.Primary}
        />
      </TouchableOpacity>
      <Text style={styles.titleHeader}>Chi tiết</Text>
      <Text style={styles.titleBody}>Thông tin người nhận</Text>

      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoText1}>{product.wardName} - {product.districtName} - {product.provinceName}</Text>
        <Text style={styles.userInfoText2}>Tên: {product.receiveName}</Text>
        <Text style={styles.userInfoText2}>SĐT: {product.receivePhone}</Text>
        <Text style={styles.userInfoText2}>Số tiền: {product.totalMoney} VNĐ</Text>
      </View>
      <Text style={styles.titleBody}>Thông tin đơn hàng</Text>
      <FlatList
        data={data}
        ListFooterComponent={
          status == 'shipped' ?
            <View style={styles.shippedView}>
              <Text style={{ fontSize: 20, color: Color.Primary }} >Đơn hàng đã được giao</Text>
            </View>
            :
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => status == 'pending' ? acceptOrder(product.id) : shippedOrder(product.id)}
            >
              <Text style={styles.textBtn}>{status == 'pending' ? 'Nhận đơn' : 'Đã giao'}</Text>
            </TouchableOpacity>
        }
        keyExtractor={(item, index) => index + ''}
        renderItem={({ item, index }) =>
          <View
            style={styles.cardWrapper}
          >
            <Image
              source={{ uri: item.image }}
              style={{
                width: 100,
                height: 100
              }}
              resizeMode="contain"
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle} >{item.name}</Text>
              <Text style={styles.cardPrice}>Giá: {item.price} VNĐ</Text>
              <Text style={styles.cardPrice}>Số lượng: {item.quantity}</Text>
              <Text style={styles.cardPrice}>Tổng: {item.quantity * item.price} VNĐ</Text>
              <Text style={styles.cardDate}>{moment(item.updatedAt).format("DD/MM/YYYY - hh:mm:ss")}</Text>
            </View>
          </View>
        }
      >
      </FlatList>

    </View>
  );
}


const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: "row",
    marginVertical: 10,
    paddingVertical: 5,
    width: '95%',
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    borderBottomColor: Color.GRAY,
    borderBottomWidth: 1
  },
  backBtn: {
    position: "absolute",
    top: 5,
    left: 5
  },
  titleHeader: {
    fontSize: 26,
    alignSelf: "center",
    marginVertical: 10,
    color: Color.Primary,
    fontWeight: "bold"
  },
  titleBody: {
    fontSize: 22,
    alignSelf: "center",
    marginVertical: 8,
    color: Color.Primary,
    fontWeight: "bold"
  },
  userInfoWrapper: {
    marginLeft: 16
  },
  userInfoText1: {
    fontSize: 18,
    fontWeight: "700"
  },
  userInfoText2: {
    fontSize: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "300",
    color: Color.DARK_GRAY,
  },
  cardDate: {
    alignSelf: "flex-end",
    marginRight: 20
  },
  Btn: {
    backgroundColor: Color.Primary,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    height: 60,
    marginBottom: 30,
    marginTop: 20,
    borderRadius: 10
  },
  textBtn: {
    fontSize: 18,
    fontWeight: "600",
    color: Color.LIGHT_GRAY
  },
  shippedView: {
    width: '100%',
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  }

});


export default OrderDetailScreen;
