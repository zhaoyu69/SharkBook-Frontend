import { observable, action, computed, toJS } from "mobx";
import AccountService from "services/AccountService";
import {globalStore} from "stores/GlobalStore";
import {accountStore} from "stores/AccountStore";

export default class DetailStore{
    @observable accounts=[];
    @observable showTime=moment();
    @observable accountId = "";
    @observable accContentFocus={};
    @observable accPriceFocus={};

    // 显示年
    @computed get showYear() {
        return this.showTime.year();
    }
    // 显示月
    @computed get showMonth() {
        return this.showTime.month() + 1;
    }

    // 选择时间
    @action timeSelect=(time)=>{
        this.showTime = moment(time);
    };
    // 获取所有账单
    @action getAccounts=async()=> {
        this.accounts = await AccountService.getAccounts(globalStore.userId);
    };

    // 按年月过滤账单
    @computed get accountsByTime() {
        return toJS(this.accounts).filter(acc =>{
            return moment(acc.time.iso).year() === this.showYear && moment(acc.time.iso).month() + 1 === this.showMonth
        });
    }

    // 年月账单按支出/收入分组
    @computed get timeAccountsByClassify() {
        return _.groupBy(toJS(this.accountsByTime), (timeAccount)=>{
            return timeAccount.userType.type.classify;
        });
    }

    // 获得月总支出/收入
    @computed get paysByMonth() {
        return this.timeAccountsByClassify["pay"]
            && _.round(_.sum(this.timeAccountsByClassify["pay"].map(acc=>acc.price)), 2)
            || "0.00";
    }
    // 获得月总支出/收入
    @computed get incomesByMonth() {
        return this.timeAccountsByClassify["income"]
            && _.round(_.sum(this.timeAccountsByClassify["income"].map(acc=>acc.price)), 2)
            || "0.00";
    }

    // 按日分组账单
    @computed get timeAccountsByDate() {
        return _.groupBy(this.accountsByTime, (acc) => moment(acc.time.iso).date());
    }

    // 每个月有账单的日子[1,2,...]
    @computed get dates() {
        return Object.keys(toJS(this.timeAccountsByDate));
    }

    // 获取星期几
    @action getDay(timeAccount) {
        let week = moment(timeAccount.time).day();
        const weeks=["一","二","三","四","五","六","日"];
        if(week === 0) {
            week = 7;
        }
        week -= 1;
        return weeks[week];
    }

    // 获得日总支出/收入
    @action getPaysOrIncomesByDate(timeAccounts) {
        // 日账单按收入支出再分类
        const timeAccountsByDateClassify = _.groupBy(timeAccounts, (timeAccount)=>{
            return timeAccount.userType.type.classify;
        });
        const pays = timeAccountsByDateClassify["pay"]
            && _.round(_.sum(timeAccountsByDateClassify["pay"].map(acc=>acc.price)), 2)
            || "0.00";
        const incomes = timeAccountsByDateClassify["income"]
            && _.round(_.sum(timeAccountsByDateClassify["income"].map(acc=>acc.price)), 2)
            || "0.00";
        return {pays, incomes};
    }

    // 删除记账
    @action removeAccount=async(accountId)=>{
        await AccountService.removeAccount(accountId);
        this.getAccounts();
    };

    // 点击账单图标更新
    @action accIconClick=(account)=>{
        this.accountId = account.objectId;
        globalStore.showAccounting(account);
        accountStore.isUpdateChange(true);
    };

    // 点击账单内容更新
    @action accContentChange=(account, name)=>{
        const _account = this.accounts.find(acc=>acc.objectId === account.objectId);
        _account.name = name;
        this.accounts = toJS(this.accounts);
        AccountService.updateAccount(account.objectId, "name", name);
    };

    // 点击账单金额更新
    @action accPriceChange=(account, price)=>{
        const num_price = Number(price.replace(/[+-]/g, ''));
        if(isNaN(num_price)) {
            return;
        }
        const _account = this.accounts.find(acc=>acc.objectId === account.objectId);
        _account.price = num_price;
        this.accounts = toJS(this.accounts);
        AccountService.updateAccount(account.objectId, "price", num_price);
    };
}

export const detailStore = new DetailStore();