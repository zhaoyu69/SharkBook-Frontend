import React from 'react';
import {observer} from "mobx-react";
import Footer from "components/footer";
import styles from './index.less';
import {List} from 'antd-mobile';
import './index.module.less';
import {discoverStore as store} from "stores/DiscoverStore";
import {toJS} from "mobx";

@observer
class Discover extends React.Component {
    constructor(props, context) {
        super(props, context);
        store.getFeatures();
    }

    render() {
        const features = toJS(store.features);
        return (
            <div className={cx(styles.container, 'discover-container')}>
                <header>发现</header>
                <div className={styles.main}>
                    <div className={styles.accounts}>
                        <List.Item arrow="horizontal">账单</List.Item>
                        <div className={styles.month}>
                            <span className={styles.month_num}>11</span>月
                            <div className={styles.rightLine}> </div>
                        </div>
                        <dl className={styles.income}>
                            <dt className={styles.title}>收入</dt>
                            <dd className={styles.count}>0.00</dd>
                        </dl>
                        <dl className={styles.pay}>
                            <dt className={styles.title}>支出</dt>
                            <dd className={styles.count}>0.00</dd>
                        </dl>
                        <dl className={styles.surplus}>
                            <dt className={styles.title}>剩余</dt>
                            <dd className={styles.count}>0.00</dd>
                        </dl>
                    </div>
                    <div className={styles.classes}>
                        <List.Item arrow="horizontal" extra="查看全部">财富星课堂</List.Item>
                        <dl className={styles.class}>
                            <img src="/static/images/xiaobai.png" alt="" className={styles.class_img}/>
                            <dd className={styles.class_tl}>
                                <p className={styles.title}>理财基础课</p>
                                <p className={styles.discription}>一看就懂，手把手教你学理财</p>
                                <p className={styles.buycount}>3287人已购买</p>
                            </dd>
                            <dd className={styles.class_tr}>
                                <p className={styles.price}>98财富币</p>
                                <p className={styles.times}>共18课</p>
                            </dd>
                        </dl>
                    </div>
                    <div className={styles.features}>
                        <List.Item>常用功能</List.Item>
                        <ul className={styles.list}>
                            {features.map((item, idx) => {
                                const {name, icon} = item;
                                return (
                                    <li key={idx} onClick={()=>{}} className={styles.item}>
                                        <img src={icon} alt="" className={styles.itemImg}/>
                                        <p className={styles.itemTitle}>{name}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Discover;
