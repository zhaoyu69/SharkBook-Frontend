import { observable, action, computed } from "mobx";

export default class GlobalStore{
    @observable accTop="0";
    // 打开记账
    @action showAccounting=()=>{
        this.accTop="0";

    };
    // 关闭记账
    @action closeAccounting=()=>{
        this.accTop="100vh";
    };
}

export const globalStore = new GlobalStore();