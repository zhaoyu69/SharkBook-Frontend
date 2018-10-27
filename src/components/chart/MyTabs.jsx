import React from 'react';
import {observer} from "mobx-react";
import {Tabs} from 'antd-mobile';
import styles from './MyTabs.less';

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
                      onChange={(tab, index) => { console.log('onChange', index, tab); }}
                      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                      renderTabBar={this.renderTabBar}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of first tab
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                        Content of second tab
                    </div>
                </Tabs>
            </div>
        );
    }
}

export default MyTabs;
