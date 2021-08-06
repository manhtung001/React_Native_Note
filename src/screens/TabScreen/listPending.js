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
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import dataService from '../../network/dataService';
import Layout from '../../constants/Layout';
import moment from 'moment';
import Color from './../../constants/Color';

const LIMIT_DATA = 20

const listPendingScreen = (props) => {

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getListPending();
    });
  }, []);

  const [listPending, setListPending] = useState([]);

  const getListPending = async () => {
    let res = await dataService.getListPending({
      skip: 0,
      limit: LIMIT_DATA
    });
    if (res.code == 0) {
      setListPending(res.data.orderPendingInfos);
    }
  }

  const toOrderDetail = async (item) => {
    let data = {
      orderId: item.id,
      skip: 0,
      limit: LIMIT_DATA
    }
    let res = await dataService.getOrderDetail(data);
    if (res.code == 0) {
      props.navigation.navigate("OrderDetailScreen", { res, status: 'pending', item })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={listPending}
        style={{
          flex: 1
        }}
        ListFooterComponent = {
          <View
            style={{height: 40, width: "100%", alignItems: "center", justifyContent: "center"}}
          >
            <Text style={{fontSize: 16}}>- Hết -</Text>
          </View>
        }
        keyExtractor={(item, index) => index + ''}
        renderItem={({ item, index }) =>
          <View style={styles.cardItemWrapper}>
            <TouchableOpacity
              style={styles.cardItem}
              onPress={() => toOrderDetail(item)}
            >
              <Text style={styles.cardText1}>{item.wardName} - {item.districtName} - {item.provinceName}</Text>
              <Text style={styles.cardText2}>Tên: {item.receiveName}</Text>
              <Text style={styles.cardText2}>SĐT: {item.receivePhone}</Text>
              <Text style={styles.cardText2}>Số tiền: {item.totalMoney} VNĐ</Text>
              <Text style={styles.cardTextDate}>{moment(item.createdAt).format("DD/MM/YYYY - hh:mm:ss")}</Text>
            </TouchableOpacity>
          </View>
        }
      >
      </FlatList>
    </View>
  );
}


const styles = StyleSheet.create({

  cardItemWrapper: {
    width: Layout.screen.width / 1.05,
    height: Layout.screen.height / 6.5,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: '#dedede',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
    overflow: "hidden"
  },
  cardItem: {
    paddingLeft: 15,
    paddingTop: 10,
    flex: 1
  },
  cardText1: {
    fontSize: 18,
    fontWeight: "700"
  },
  cardText2: {
    fontSize: 16,
  },
  cardTextDate: {
    fontSize: 14,
    fontWeight: "400",
    alignSelf: "flex-end",
    marginRight: 10
  },
});



export default listPendingScreen;
