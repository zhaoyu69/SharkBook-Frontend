import {getData, getError} from "utils/request";

export default class AccountService {
    static setActive(list, id) {
        _.forEach(list, (value, key) => {
            list[key].active=0;
            if(value.objectId === id){
                list[key].active=1;
            }
        });
    }

    static initListActives(list) {
        _.forEach(list, (value, key) => {
            list[key].active=0;
        });
    }

    static async makeAccount(typeId, remarks, price, time) {
        return axios.post('/api/account/makeAccount', {typeId, remarks, price, time}).then(getData).catch(getError);
    }

    static async getAccounts(userId) {
        return axios.post('/api/account/getAccounts', {userId}).then(getData).catch(getError);
    }

    static async removeAccount(accountId) {
        return axios.post('/api/account/removeAccount', {accountId}).then(getData).catch(getError);
    }

    static async updateUserType(accountId, typeId) {
        return axios.post('/api/account/updateUserType', {accountId, typeId}).then(getData).catch(getError);
    }

    static async updateAccount(accountId, type, value) {
        return axios.post('/api/account/updateAccount', {accountId, type, value}).then(getData).catch(getError);
    }
}