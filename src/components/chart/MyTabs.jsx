import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './MyTabs.less';
import {chartStore as store} from "stores/ChartStore";
import {toJS} from "mobx";
import LineChart from "components/chart/LineChart";
import Leaderboard from "components/chart/Leaderboard";

@observer
class MyTabs extends React.Component {
    renderTabBar=(props, index)=>{
        const {changePage} = store;
        const {tabs, activeTab} = props;
        return <div className={styles.tabbar}>
            <ul className={styles.tablist}>
                {tabs.map(tab => {
                    const {page, title} = tab;
                    return (
                        <li key={page}
                            className={activeTab === page?styles.activeTabli:styles.normalTabli}
                            onClick={()=>changePage(index, page)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    };
    render() {
        const {tabs, segmentedSelectedIndex} = store;
        const pages = toJS(store.pages);
        return (
            <div>
                <Tabs tabs={tabs}
                      page={pages[segmentedSelectedIndex]}
                      renderTabBar={(...args)=>this.renderTabBar(...args, segmentedSelectedIndex)}
                >
                    <div>
                        <LineChart/>
                        <Leaderboard/>
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default MyTabs;
