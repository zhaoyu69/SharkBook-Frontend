import { observable, action, computed } from "mobx";

export default class GlobalStore {
    @observable accTop = "100vh";

    // 打开记账
    @action showAccounting = () => {
        this.accTop = "0";
    };
    // 关闭记账
    @action closeAccounting = () => {
        this.accTop = "100vh";
    };

    get user() {
        return Parse.User.current();
    }

    get isLogin() {
        return !!Parse.User.current();
    }
}

export const globalStore = new GlobalStore();