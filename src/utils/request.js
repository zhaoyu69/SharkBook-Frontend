import {Toast} from 'antd-mobile';

const getData = (resp) => resp.data;
const getError = (err) => Toast.fail(err.response.data.message, 1);

export {getData, getError};