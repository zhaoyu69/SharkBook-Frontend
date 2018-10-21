import React from 'react';
import {toJS} from "mobx";
import {observer} from "mobx-react";
import styles from './index.less';
import {NoticeBar, SwipeAction, List, DatePicker, InputItem} from 'antd-mobile';
import Footer from "components/footer";
import './index.module.less';
import {globalStore} from "stores/GlobalStore";
import {detailStore as store} from "stores/DetailStore";

@observer
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        store.getAccounts();
    }

    getList=()=>{
        const timeAccountsGroup = toJS(store.timeAccountsByDate);
        const {showMonth, dates, getDay, getPaysOrIncomesByDate, removeAccount,
            accIconClick, accContentChange, accPriceChange} = store;
        const accContentFocus = toJS(store.accContentFocus);
        const accPriceFocus = toJS(store.accPriceFocus);
        if(!dates.length) {
            return (
                <div className={styles.noData}>
                    <img src="/static/images/no_data@3x.png" alt=""/>
                    <p>暂无数据</p>
                </div>
            );
        }
        return dates.map(date => {
            const timeAccounts = timeAccountsGroup[date];
            const week = getDay(timeAccounts[0]);
            const {pays, incomes} = getPaysOrIncomesByDate(timeAccounts);
            return (
                <div key={date}>
                    <div className={styles.listLine}>
                        <div className={styles.listdate}>
                            {showMonth}月{date}日 星期{week}
                        </div>
                        <div className={styles.listTotal}>
                            收入：{incomes} &nbsp;&nbsp; 支出：{pays}
                        </div>
                    </div>
                    {timeAccounts.map((acc, idx) => {
                        const {price, objectId} = acc;
                        const {listIcon, classify} = acc.userType.type;
                        const name = acc.name?acc.name : acc.userType.type.name;
                        return (
                            <SwipeAction
                                key={date + "-" + idx}
                                style={{ backgroundColor: '#ccc', clear:"both" }}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => removeAccount(objectId),
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                                onOpen={() => {}}
                                onClose={() => {}}
                            >
                                <List.Item
                                    thumb={<img src={listIcon} alt="" onClick={()=>accIconClick(acc)}/>}
                                    extra={
                                        <InputItem
                                            style={{textAlign: "right",
                                                border: accPriceFocus[objectId]? "1px solid #ccc":"none"}}
                                            onFocus={() => store.accPriceFocus[objectId] = true}
                                            onBlur={() => store.accPriceFocus[objectId] = false}
                                            onChange={(price) => accPriceChange(acc, price)}
                                            value={(classify === "pay"?'-' : '')+ price}
                                        />
                                    }
                                    onClick={() => {}}
                                    className={styles.listItem}
                                >
                                    <InputItem
                                        style={{ border: accContentFocus[objectId]? "1px solid #ccc":"none" }}
                                        onFocus={() => store.accContentFocus[objectId] = true}
                                        onBlur={() => store.accContentFocus[objectId] = false}
                                        onChange={(name) => accContentChange(acc, name)}
                                        value={name}
                                    />
                                </List.Item>
                            </SwipeAction>
                        )
                    })}
                </div>
            )
        });
    };

    render() {
        const {isLogin} = globalStore;
        const {timeSelect, showYear, showMonth, showTime, paysByMonth, incomesByMonth} = store;
        return (
            <div className={cx(styles.container, "detail-container")}>
                <header><img src="/static/images/detail_share_shark@3x.png" alt=""/></header>
                {/*总览*/}
                <div className={styles.overview}>
                    <dl className={styles.datePicker}>
                        <dt className={styles.year}>{showYear}年</dt>
                        <DatePicker
                            mode="date"
                            title="选择年月"
                            extra="Optional"
                            className={"datePicker"}
                            value={showTime.toDate()}
                            onOk={timeSelect}
                        >
                            <dd className={styles.month}>
                                <span className={styles.month_num}>{showMonth}</span>月
                                <img src="/static/images/pull_arrow@3x.png" alt=""/>
                                <div className={styles.rightLine}> </div>
                            </dd>
                        </DatePicker>
                    </dl>
                    <dl className={styles.income}>
                        <dt className={styles.title}>收入</dt>
                        <dd className={styles.count}>{incomesByMonth}</dd>
                    </dl>
                    <dl className={styles.pay}>
                        <dt className={styles.title}>支出</dt>
                        <dd className={styles.count}>{paysByMonth}</dd>
                    </dl>
                </div>
                {/*通知*/}
                {isLogin?null:<div className={styles.noticeBar}>
                    <NoticeBar icon={<img className={styles.icon} src="/static/images/no_network@3x.png" alt=""/>}
                               style={{backgroundColor: "transparent"}}>
                        <p>登录后数据可以实时备份，更安全哦</p>
                    </NoticeBar>
                </div>}
                {/*列表*/}
                <div className={styles.list}>
                    {this.getList()}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Detail;
