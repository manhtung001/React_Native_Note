import request from './request';
let dataService = {

  login: (params) => {
    let url = 'api/shipper/login';
    return request.post(params, url);
  },
  getListPending: (params) => {
    let url = 'api/shipper/list-order-pending';
    return request.post(params ,url);
  },
  getListShipping: (params) => {
    let url = 'api/shipper/list-order-shipping';
    return request.post(params ,url);
  },
  getListShipped: (params) => {
    let url = 'api/shipper/list-order-shipped';
    return request.post(params ,url);
  },
  getOrderDetail: (params) => {
    let url = 'api/shipper/order-detail';
    return request.post(params ,url);
  },
  shipperAcceptOrder: (params) => {
    let url = 'api/shipper/accept-order';
    return request.post(params ,url);
  },
  shipperShippedOrder: (params) => {
    let url = 'api/shipper/shipped-order';
    return request.post(params ,url);
  }
 

  
};

export default dataService;
