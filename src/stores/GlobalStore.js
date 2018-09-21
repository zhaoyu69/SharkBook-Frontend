import { observable, action, computed } from "mobx";

export default class GlobalStore{
    // 打开记账
    @action showAccounting=()=>{
        const elem = document.getElementById("accounting_wrap");
        elem.style.animationPlayState = "running";
        elem.style.display = "block";
    };

    // 关闭记账
    @action closeAccounting=()=>{
        const elem = document.getElementById('accounting_wrap');
        elem.style.display = "none";
    };
}

export const globalStore = new GlobalStore();