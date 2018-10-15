import { observable, action, computed } from "mobx";

export default class GlobalStore{
    @observable accTop="100vh";
    @observable currenUser=Parse.User.current();

    // 打开记账
    @action showAccounting=()=>{
        this.accTop="0";
    };
    // 关闭记账
    @action closeAccounting=()=>{
        this.accTop="100vh";
    };

    @computed get isLogin(){
        return !!this.currenUser;
    }
}

export const globalStore = new GlobalStore();