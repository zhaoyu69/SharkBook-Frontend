import {observable, action, computed, toJS} from "mobx";
import AccountService from "services/AccountService";
import {globalStore} from "stores/GlobalStore";
const classifyDict={
    pay: "支出",
    income: "收入"
};

export default class ChartStore{
    @observable pages=[0, 0, 0]; //周月年的tagPage
    @observable accounts=[];
    @observable nowTime=moment();
    @observable classify="支出";

    // 获取所有账单
    @action getAccounts=async()=> {
        this.accounts = await AccountService.getAccounts(globalStore.userId);
    };

    // 先按支出/收入过滤
    @computed get accountsByClassify() {
        return toJS(this.accounts).filter((acc) => {
            return classifyDict[acc.userType.type.classify] === this.classify
        });
    }

    // 本周开始
    @computed get weekBegin() {
        return moment(this.nowTime.startOf('week'));
    }
    // 本周结束
    @computed get weekEnd() {
        return moment(this.nowTime.endOf('week'));
    }
    // 上周开始
    @computed get lastWeekBegin() {
        return moment(this.weekBegin.subtract(7, 'd'));
    }
    // 上周结束
    @computed get lastWeekEnd() {
        return moment(this.weekEnd.subtract(7, 'd'));
    }
    // 获取日期范围内所有天数
    getWeeks=(weekBegin, weekEnd)=> {
        let dates = [];
        let len = moment.duration(weekEnd - weekBegin).asDays();
        len = Math.ceil(len);
        let d = moment(this.weekBegin);
        dates = [moment(d)];
        _.range(1, len).map(()=>{
            dates.push(moment(d.add(1, 'd')))
        });
        return dates;
    };
    // 本周日期
    @computed get weekDates() {
        return this.getWeeks(this.weekBegin, this.weekEnd);
    }
    // 上周日期
    @computed get lastWeekDates() {
        return this.getWeeks(this.lastWeekBegin, this.lastWeekEnd);
    }

    // 本周账单
    @computed get currentWeekAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).isBetween(this.weekBegin, this.weekEnd));
    }

    // 上周账单
    @computed get lastWeekAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).isBetween(this.lastWeekBegin, this.lastWeekEnd));
    }

    // 本月账单
    @computed get currentMonthAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).month() === this.nowTime.month());
    }

    // 今年账单
    @computed get currentYearAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).year() === this.nowTime.year());
    }

    @action reset=()=>{
        this.pages = [0, 0, 0];
    };

    @action changePage=(index, page)=>{
        this.pages[index] = page;
    };
}

export const chartStore = new ChartStore();