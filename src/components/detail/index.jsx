import React from 'react';
import {observer} from "mobx-react";
import styles from './index.less';
import {NoticeBar, SwipeAction, List} from 'antd-mobile';

@observer
class Detail extends React.Component {
    render() {
        return (
            <div className={styles.detail}>
                <header><img src="/static/images/detail_share_shark@3x.png" alt=""/></header>
                {/*总览*/}
                <div className={styles.overview}>
                    <dl className={styles.datePicker}>
                        <dt className={styles.year}>2018年</dt>
                        <dd className={styles.month}>
                            <span className={styles.month_num}>10</span>月
                            <img src="/static/images/pull_arrow@3x.png" alt=""/>
                            <div className={styles.rightLine}> </div>
                        </dd>
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
                <div className={styles.noticeBar}>
                    <NoticeBar icon={<img className={styles.icon} src="/static/images/no_network@3x.png" alt=""/>}
                               style={{backgroundColor: "transparent"}}>
                        <p>登录后数据可以实时备份，更安全哦</p>
                    </NoticeBar>
                </div>
                {/*列表*/}
                <div className={styles.list}>
                    <div>
                        <div className={styles.listdate}>
                            10月13日 星期六
                        </div>
                        <div className={styles.listTotal}>
                            支出：0.00 收入：0.00
                        </div>
                    </div>
                    <SwipeAction
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
                            extra="0.00"
                            onClick={() => console.log('List.Item clicked!')}
                            className={styles.listItem}
                        >
                            <img src="/static/images/e_commodity_l@3x.png" alt=""/> 日用
                        </List.Item>
                    </SwipeAction>
                </div>
            </div>
        );
    }
}

export default Detail;
