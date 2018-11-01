import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './MyTabs.less';
import TabContent from "components/chart/TabContent";
import {chartStore as store} from "stores/ChartStore";
import {toJS} from "mobx";

@observer
class MyTabs extends React.Component {
    renderTabBar=(props, pageIndex)=>{
        const {changePage} = store;
        const {tabs, activeTab} = props;
        return <div className={styles.tabbar}>
            <ul className={styles.tablist}>
                {tabs.map(tab => {
                    const {page, title} = tab;
                    return (
                        <li key={page}
                            className={activeTab === page?styles.activeTabli:styles.normalTabli}
                            onClick={()=>changePage(pageIndex, page)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    };
    render() {
        const {tabs, pageIndex} = this.props;
        const pages = toJS(store.pages);
        return (
            <div>
                <Tabs tabs={tabs}
                      page={pages[pageIndex]}
                      renderTabBar={(...args)=>this.renderTabBar(...args, pageIndex)}
                >
                    <TabContent {...this.props}/>
                    <TabContent {...this.props}/>
                </Tabs>
            </div>
        );
    }
}

export default MyTabs;
