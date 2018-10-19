import { observable, action, computed, toJS } from "mobx";
import AccountService from "services/AccountService";
import {globalStore} from "stores/GlobalStore";

export default class DetailStore{
    @observable accounts=[];
    @observable showTime=moment();

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
        return toJS(this.accounts).filter(acc =>
            moment(acc).year() === this.showYear && moment(acc).month() + 1 === this.showMonth)
    }

    // 按日分组账单
    @computed get timeAccountsGroup() {
        return _.groupBy(this.accountsByTime, (account) => moment(account.time).date());
    }
}

export const detailStore = new DetailStore();