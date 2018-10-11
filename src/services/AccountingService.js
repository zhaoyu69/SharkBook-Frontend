export default class AccountingService {
    static listItemClick(list, item) {
        _.forEach(list, (value, key) => {
            list[key].active=0;
            if(value.title === item.title){
                list[key].active=1;
            }
        });
    }

    static initListActives(list) {
        _.forEach(list, (value, key) => {
            list[key].active=0;
        });
    }
}