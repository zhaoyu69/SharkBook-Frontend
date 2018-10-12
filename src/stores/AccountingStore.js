import { observable, action, computed, toJS } from "mobx";
import payList from 'utils/payList';
import incomeList from 'utils/incomeList';
import AccountingService from "services/AccountingService";

export default class AccountingStore{
    @observable f_PayList = payList;
    @observable f_IncomeList = incomeList;
    @observable tabPage = 0; // 支出/收入的tab
    @observable activeItem; // 激活的类别
    @observable totalPrice = "0.00"; // 账单金额
    @observable remarks = ""; // 备注
    @observable accTime = moment(); // 记账日期

    @computed get c_PayList(){
        return _.chunk(toJS(this.f_PayList), 4);
    }
    @computed get c_IncomeList(){
        return _.chunk(toJS(this.f_IncomeList), 4);
    }

    @action payItemClick = (item) => {
        AccountingService.listItemClick(this.f_PayList, item);
        this.activeItem = item;
    };

    @action incomeItemClick = (item) => {
        AccountingService.listItemClick(this.f_IncomeList, item);
        this.activeItem = item;
    };

    // 切换支出/收入
    @action changePage = (page) => {
        this.initListActives();
        this.tabPage = page;
    };

    @action initListActives = () => {
        AccountingService.initListActives(this.f_PayList);
        AccountingService.initListActives(this.f_IncomeList);
    };

    // 是否有激活的类别，有则显示计算表盘
    @computed get activeStatus(){
        const findPayActive = _.findIndex(this.f_PayList, (o)=>o.active===1) !== -1;
        const findIncomeActive = _.findIndex(this.f_IncomeList, (o)=>o.active===1) !== -1;
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
        this.accTime = moment(time);
    };
}

export const accountingStore = new AccountingStore();