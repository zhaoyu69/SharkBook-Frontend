import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './MyTabs.less';
import {chartStore as store} from "stores/ChartStore";
import LineChart from "components/chart/LineChart";
import Leaderboard from "components/chart/Leaderboard";

@observer
class MyTabs extends React.Component {
    renderTabBar=(props)=>{
        const {changePage, page} = store;
        let {tabs, activeTab} = props;
        activeTab = page;
        return <div className={styles.tabbar}>
            <ul className={styles.tablist}>
                {tabs.map(tab => {
                    const {page, title} = tab;
                    return (
                        <li key={page}
                            className={activeTab === page?styles.activeTabli:styles.normalTabli}
                            onClick={()=>changePage(page)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    };
    render() {
        const {tabs, page} = store;
        return (
            <Tabs tabs={tabs}
                  page={page}
                  renderTabBar={this.renderTabBar}
                  swipeable={false}
            >
                <div className={styles.tabContent}>
                    <LineChart/>
                    <Leaderboard/>
                </div>
            </Tabs>
        );
    }
}

export default MyTabs;
