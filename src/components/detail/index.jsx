import React from 'react';
import {toJS} from "mobx";
import {observer} from "mobx-react";
import styles from './index.less';
import {NoticeBar, SwipeAction, List, DatePicker} from 'antd-mobile';
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
        const timeAccountsGroup = toJS(store.timeAccountsGroup);
        const {showMonth} = store;
        if(!timeAccountsGroup) {
            return null;
        }
        const dates = Object.keys(timeAccountsGroup);
        return dates.map(date => {
            const accounts = timeAccountsGroup[date];
            return (
                <div key={date}>
                    <div className={styles.listLine}>
                        <div className={styles.listdate}>
                            {showMonth}月{date}日 星期六
                        </div>
                        <div className={styles.listTotal}>
                            支出：0.00 收入：0.00
                        </div>
                    </div>
                    {accounts.map((acc, idx) => {
                        return (
                            <SwipeAction
                                key={date + "-" + idx}
                                style={{ backgroundColor: '#ccc', clear:"both" }}
                                autoClose
                                right={[
                                    {
                                        text: '删除',
                                        onPress: () => console.log('delete'),
                                        style: { backgroundColor: '#F4333C', color: 'white' },
                                    },
                                ]}
                                onOpen={() => console.log('global open')}
                                onClose={() => console.log('global close')}
                            >
                                <List.Item
                                    thumb="/static/images/e_commodity_l@3x.png"
                                    extra="0.00"
                                    onClick={() => console.log('List.Item clicked!')}
                                    className={styles.listItem}
                                >
                                    日用
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
        const {timeSelect, showYear, showMonth, showTime} = store;
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
                        <dd className={styles.count}>0.00</dd>
                    </dl>
                    <dl className={styles.pay}>
                        <dt className={styles.title}>支出</dt>
                        <dd className={styles.count}>0.00</dd>
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
