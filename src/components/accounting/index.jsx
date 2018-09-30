import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";
import TweenOne from 'rc-tween-one'; //ant-motion

const tabs = [
    { title: '支出', page: 0 },
    { title: '收入', page: 1 },
];

@observer
class Accounting extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {page:0}
    }

    renderTabBar = (props) => {
        const {tabs, activeTab} = props;
        return (
            <div className={styles.tabbar}>
                <ul className={styles.tablist}>
                    {tabs.map(tab => {
                        const page = tab.page;
                        return (
                            <li key={page}
                                style={activeTab === page?{borderBottom: "2px solid #000"}:{}}
                                onClick={()=>this.changePage(page)}>{tab.title}</li>
                        )
                    })}
                </ul>
                <span className={styles.cancel} onClick={globalStore.closeAccounting}>取消</span>
            </div>
        );
    };

    changePage=(page)=>{
        this.setState({page})
    };

    render() {
        const {accTop} = globalStore;
        const {page} = this.state;
        return (
            <TweenOne
                className={styles.container}
                animation={{top: accTop, duration: 300}}>
                <Tabs tabs={tabs}
                      page={page}
                      renderTabBar={this.renderTabBar}
                >
                    <div className={styles.tabContent}>
                        Content of first tab
                    </div>
                    <div className={styles.tabContent}>
                        Content of second tab
                    </div>
                </Tabs>
            </TweenOne>
        );
    }
}

export default Accounting;
