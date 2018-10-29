import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './MyTabs.less';
import TabContent from "components/chart/TabContent";

@observer
class MyTabs extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state={
            page: 0,
        }
    }

    changePage=(page)=>{
        this.setState({page});
    };

    renderTabBar=(props)=>{
        const {tabs, activeTab} = props;
        return <div className={styles.tabbar}>
            <ul className={styles.tablist}>
                {tabs.map(tab => {
                    const {page, title} = tab;
                    return (
                        <li key={page}
                            className={activeTab === page?styles.activeTabli:styles.normalTabli}
                            onClick={()=>this.changePage(page)}>{title}</li>
                    )
                })}
            </ul>
        </div>
    };
    render() {
        const {tabs} = this.props;
        const {page} = this.state;
        return (
            <div>
                <Tabs tabs={tabs}
                      page={page}
                      renderTabBar={this.renderTabBar}
                >
                    <TabContent {...this.props}/>
                    <TabContent {...this.props}/>
                </Tabs>
            </div>
        );
    }
}

export default MyTabs;
