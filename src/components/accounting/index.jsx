import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";
import TweenOne from 'rc-tween-one';//ant-motion
import PayList from "components/accounting/PayList";
import IncomeList from "components/accounting/IncomeList";
import {accountingStore} from "stores/AccountingStore";
import Calculator from "components/accounting/Calculator";

const tabs = [
    { title: '支出', page: 0 },
    { title: '收入', page: 1 },
];

@observer
class Accounting extends React.Component {
    renderTabBar = (props) => {
        const {tabs, activeTab} = props;
        const {changePage} = accountingStore;
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
        accountingStore.initListActives();
    };

    render() {
        const {accTop} = globalStore;
        const {tabPage, activeStatus} = accountingStore;
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
                            <PayList store={accountingStore}/>
                        </div>
                        <div className={styles.tabContent}>
                            <IncomeList store={accountingStore}/>
                        </div>
                    </Tabs>
                </TweenOne>
                {activeStatus?<Calculator store={accountingStore}/>:null}
            </div>
        );
    }
}

export default Accounting;
