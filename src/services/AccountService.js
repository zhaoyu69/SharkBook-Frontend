import {getData, getError} from "utils/request";

export default class AccountService {
    static listItemClick(list, item) {
        _.forEach(list, (value, key) => {
            list[key].active=0;
            if(value.name === item.name){
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
}