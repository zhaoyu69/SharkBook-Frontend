import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";
import TweenOne from 'rc-tween-one';//ant-motion
import AccountList from "components/account/AccountList";
import {accountStore as store} from "stores/AccountStore";
import Calculator from "components/account/Calculator";
import {toJS} from "mobx/lib/mobx";

const tabs = [
    { title: '支出', page: 0 },
    { title: '收入', page: 1 },
];

@observer
class Account extends React.Component {
    constructor(props, context) {
        super(props, context);
        store.getUserTypes();
    }

    renderTabBar = (props) => {
        const {tabs, activeTab} = props;
        const {changePage} = store;
        return (
            <div className={styles.tabbar}>
                <ul className={styles.tablist}>
                    {tabs.map(tab => {
                        const page = tab.page;
                        return (
                            <li key={page}
                                style={activeTab === page?{borderBottom: "2px solid #000"}:{}}
                                onClick={()=>changePage(page)}>{tab.title}</li>
                        )
                    })}
                </ul>
                <span className={styles.cancel} onClick={this.closeAccounting}>取消</span>
            </div>
        );
    };

    closeAccounting = () => {
        globalStore.closeAccounting();
        store.initListActives();
    };

    render() {
        const {accTop} = globalStore;
        const {tabPage, activeStatus} = store;
        const payList = toJS(store.payList);
        const incomeList = toJS(store.incomeList);
        return (
            <div>
                <TweenOne
                    className={styles.container}
                    animation={{top: accTop, duration: 300}}>
                    <Tabs tabs={tabs}
                          page={tabPage}
                          renderTabBar={this.renderTabBar}
                    >
                        <div className={styles.tabContent}>
                            <AccountList list={payList}/>
                        </div>
                        <div className={styles.tabContent}>
                            <AccountList list={incomeList}/>
                        </div>
                    </Tabs>
                </TweenOne>
                {activeStatus?<Calculator />:null}
            </div>
        );
    }
}

export default Account;
