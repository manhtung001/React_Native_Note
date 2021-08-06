import dataService from './../network/dataService';
import { Linking } from 'react-native';
import { CommonActions } from '@react-navigation/native';
let store = null;
const helpers = {
    setStore: (newStore) => {
        store = newStore;
    },
    showLoading: () => {
        store.dispatch({type: 'SHOW_LOADING'});
      },
      showMessage: ({content, title, callBack, nameClose}) => {
        store.dispatch({
          type: 'SHOW_MESSAGE',
          content: content,
          title,
          funcMsg: callBack,
          nameClose,
        });
      },
      hideModal: () => {
        store.dispatch({type: 'HIDE_MODAL'});
      },
      showComfirm: ({
        title,
        content,
        textOk,
        textCancer,
        onOk,
        onCancer,
        confirmImgUrl,
      }) => {
        store.dispatch({
          type: 'SHOW_CONFIRM',
          title,
          content,
          textOk,
          textCancer,
          onOk,
          onCancer,
          confirmImgUrl,
        });
      },
    
    getToken: () => {
		return store ? store.getState().userState.token : undefined;
    },

    login: async (data) => {
        let result = await dataService.login(data);
        console.log(result);
        if (result.code == 0) {
            store.dispatch({
                type: 'SET_USER_INFO',
                data: result.data.shipperInfo,
            });
            store.dispatch({
                type: 'SET_TOKEN',
                data: result.data.token,
            });
        }
        return result;
    },
    clearUser:()=> {
      store.dispatch({
        type: 'CLEAR_USER',
    });
    }
};

export default helpers;
