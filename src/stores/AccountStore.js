import { observable, action, computed, toJS } from "mobx";
import AccountingService from "services/AccountService";
import TypeService from "services/TypeService";
import {globalStore} from "stores/GlobalStore";
import {goto} from "utils/go";
import {detailStore} from "stores/DetailStore";

export default class AccountStore{
    @observable payList = [];
    @observable incomeList = [];
    @observable tabPage = 0; // 支出/收入的tab
    @observable activeItem; // 激活的类别
    @observable totalPrice = "0.00"; // 账单金额
    @observable remarks = ""; // 备注
    @observable accTime = moment().startOf('day'); // 记账日期
    // 明细页点击更新
    @observable isUpdate = false;

    @action isUpdateChange=(isUpdate)=>{
        this.isUpdate = isUpdate;
    };

    @action init=()=>{
        this.initListActives();
        this.initData();
        globalStore.closeAccounting();
        detailStore.getAccounts();
        goto("/");
    };

    @action initData=()=>{
        this.activeItem=undefined;
        this.totalPrice="0.00";
        this.remarks="";
    };

    // 获取类别库
    @action getUserTypes=async(account)=> {
        const userTypes = await TypeService.getUserTypes(globalStore.user);
        // 明细页更新 设置初始激活类别
        if(account.userType) {
            AccountingService.setActive(userTypes, account.userType.type.objectId);
        }
        const {pay, income} = _.groupBy(userTypes, "classify");
        this.payList = _.sortBy(pay, "number");
        this.incomeList = _.sortBy(income, "number");
    };

    @action listItemClick = async (list, item) => {
        AccountingService.setActive(list, item.objectId);
        this.activeItem = item;
        // 明细页点击更新类别
        if(this.isUpdate) {
            await AccountingService.updateUserType(detailStore.accountId, item.objectId);
            await AccountingService.updateAccount(detailStore.accountId, "name", "");
            this.init();
        }
    };

    // 切换支出/收入
    @action changePage = (page) => {
        this.initListActives();
        this.tabPage = page;
    };

    @action initListActives = () => {
        AccountingService.initListActives(this.payList);
        AccountingService.initListActives(this.incomeList);
    };

    // 是否有激活的类别，有则显示计算表盘
    @computed get activeStatus(){
        // 明细页点击更新 不显示键盘
        if(this.isUpdate) {
            return false;
        }
        const findPayActive = _.findIndex(this.payList, (o)=>o.active===1) !== -1;
        const findIncomeActive = _.findIndex(this.incomeList, (o)=>o.active===1) !== -1;
        return findPayActive || findIncomeActive
    }

    // 是否计算完成 右下角显示完成或=
    @computed get calCompleted(){
        const lastone = this.totalPrice[this.totalPrice.length-1];
        const firstone = this.totalPrice[0];
        // 末尾不是+也不是- 但是包含着+或-
        let nums = [];
        if(lastone!=="+" && lastone!=="-"){
            if(this.totalPrice.includes("+")){
                nums = this.totalPrice.split("+");
            }
            else if(this.totalPrice.includes("-")){
                nums = this.totalPrice.split("-");
                if(firstone==="-"){
                    nums = _.drop(nums, 2);
                }
                console.log(nums);
            }
        }
        // nums为空代表完成 不为空代表需要计算=
        return !nums.length;
    }

    // 写备注
    @action writeRemarks = (remarks) => {
        this.remarks = remarks;
    };

    // 是否是今天
    @computed get isToday(){
        return moment(this.accTime).startOf('day').isSame(moment().startOf('day'));
    };

    // 时间选择
    @action timeSelect = (time) => {
        this.accTime = moment(time).startOf('day');
    };

    // 完成记账 (账单类别(Type)，备注，价格(Number)，时间(Date))
    @action makeAccount=async()=> {
        const {activeItem, totalPrice, remarks, accTime} = this;
        const typeId = activeItem.objectId;
        const price = Number(totalPrice.replace(/[+-]/g, ''));
        const account = await AccountingService.makeAccount(typeId, remarks, price, accTime);
        this.init();
    };
}

export const accountStore = new AccountStore();