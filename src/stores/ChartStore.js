import {observable, action, computed, toJS} from "mobx";
import AccountService from "services/AccountService";
import {globalStore} from "stores/GlobalStore";
import React from "react";
const classifyDict={
    pay: "支出",
    income: "收入"
};

export default class ChartStore{
    @observable pages=[1, 0, 0]; //周月年的tagPage
    @observable accounts=[];
    @observable classify="支出";
    @observable tallySelectShow=false;
    @observable segmentedSelectedIndex=0; //默认选择周

    @computed get page() {
        return this.pages[this.segmentedSelectedIndex];
    }

    // 选择收入/支出
    @action tallySelect=(type)=>{
        this.classify = type;
        this.tallySelectShow = false;
    };

    // 切换收入/支出
    @action checkout=()=>{
        this.tallySelectShow = !this.tallySelectShow;
    };

    // 点击蒙层
    @action maskClick=()=>{
        this.tallySelectShow = false;
    };

    // 切换周月年
    @action onSegmentedChange=(index)=>{
        this.segmentedSelectedIndex = index;
    };

    // 根据周月年切换tabs
    @computed get tabs(){
        switch (this.segmentedSelectedIndex) {
            case 0: return [{title: "上周", page: 0}, {title: "本周", page: 1}];
            case 1: return [{title: "本月", page: 0}];
            case 2: return [{title: "今年", page: 0}]
        }
    }

    // 本周日期
    @computed get weekDates() {
        return this.getWeeks(moment().startOf('week'), moment().endOf('week'));
    }
    // 上周日期
    @computed get lastWeekDates() {
        return this.getWeeks(moment().startOf('week').subtract(7, 'd'), moment().endOf('week').subtract(7, 'd'));
    }

    // 获取日期范围内所有天数
    getWeeks=(weekBegin, weekEnd)=> {
        let dates = [];
        let len = moment.duration(weekEnd - weekBegin).asDays();
        len = Math.ceil(len);
        let d = moment(weekBegin);
        dates = [moment(d)];
        _.range(1, len).map(()=>{
            dates.push(moment(d.add(1, 'd')))
        });
        return dates;
    };

    // 根据tab切换图表数据
    @computed get chartxAxis() {
        switch (this.segmentedSelectedIndex) {
            case 0: return this.page===0?this.lastWeekDates:this.weekDates;
            case 1: return _.range(1, moment().endOf('month').date() + 1);
            case 2: return _.range(1, moment().endOf('year').month() + 2);
        }
    }

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

    // 根据tab切换账单数据
    @computed get tabAccounts() {
        switch (this.segmentedSelectedIndex) {
            case 0: return this.page===0?this.lastWeekAccounts:this.currentWeekAccounts;
            case 1: return this.currentMonthAccounts;
            case 2: return this.currentYearAccounts;
        }
    }

    // 本周账单
    @computed get currentWeekAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).isBetween(moment().startOf('week'), moment().endOf('week')));
    }

    // 上周账单
    @computed get lastWeekAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).isBetween(moment().startOf('week').subtract(7, 'd'), moment().endOf('week').subtract(7, 'd')));
    }

    // 本月账单
    @computed get currentMonthAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).month() === moment().month());
    }

    // 今年账单
    @computed get currentYearAccounts() {
        return this.accountsByClassify.filter((acc) => moment(acc.time.iso).year() === moment().year());
    }

    // 最大值
    @action getMax=(totalPrices)=> {
        return _.max(totalPrices).toFixed(2);
    };

    // 总价
    @action getTotal=(accounts)=> {
        return _.sumBy(accounts, (acc)=>acc.price).toFixed(2);
    };

    // 平均值
    @action getAverage=(total)=> {
        return (total/this.chartxAxis.length).toFixed(2);
    };

    // 百分比
    @action getPercent=(price, total)=>{
        return ((price/total)* 100).toFixed(1);
    };

    @action reset=()=>{
        this.pages = [1, 0, 0];
    };

    @action changePage=(page)=>{
        this.pages[this.segmentedSelectedIndex] = page;
    };
}

export const chartStore = new ChartStore();