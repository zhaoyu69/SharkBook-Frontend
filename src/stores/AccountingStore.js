import { observable, action, computed, toJS } from "mobx";
import payList from 'utils/payList';
import incomeList from 'utils/incomeList';

function chunkList(list){
    const cols = 4;
    return _.chunk(list, cols);
}

function listItemClick(list, item){
    _.forEach(toJS(list), (value, key) => {
        list[key].active=0;
        if(value.title === item.title){
            list[key].active=1;
        }
    });
}

export default class AccountingStore{
    @observable f_PayList = payList;
    @observable f_IncomeList = incomeList;
    @computed get c_PayList(){
        return chunkList(toJS(this.f_PayList));
    }
    @computed get c_IncomeList(){
        return chunkList(toJS(this.f_IncomeList));
    }

    @action payItemClick = (item) => {
        listItemClick(this.f_PayList,item);
    };

    @action incomeItemClick = (item) => {
        listItemClick(this.f_IncomeList,item);
    }
}

export const accountingStore = new AccountingStore();