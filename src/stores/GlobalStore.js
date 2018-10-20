import { observable, action, computed } from "mobx";
import {accountStore} from "stores/AccountStore";

export default class GlobalStore {
    @observable accTop = "100vh";

    // 打开记账
    @action showAccounting = () => {
        this.accTop = "0";
        accountStore.getUserTypes();
    };
    // 关闭记账
    @action closeAccounting = () => {
        this.accTop = "100vh";
    };

    get user() {
        return Parse.User.current();
    }

    get userId() {
        return Parse.User.current().id;
    }

    get isLogin() {
        return !!Parse.User.current();
    }
}

export const globalStore = new GlobalStore();