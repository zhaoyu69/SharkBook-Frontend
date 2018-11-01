import React from 'react';
import {observer} from "mobx-react";
import Footer from "components/footer";
import styles from './index.less';
import {SegmentedControl, List} from 'antd-mobile';
import './index.module.less';
import MyTabs from "./MyTabs";
import {chartStore as store} from "stores/ChartStore";

@observer
class Chart extends React.Component {
    constructor(props, context) {
        super(props, context);
        store.getAccounts();
    }

    render() {
        const {classify, checkout, maskClick, tallySelect,
            segmentedSelectedIndex, tallySelectShow, onSegmentedChange, tabs} = store;
        return (
            <div className={cx(styles.container, "chart-container")}>
                <header>
                    <div>
                        <div className={styles.checkout} onClick={checkout}>
                            <span>{classify}</span>
                            <img src="/static/images/tally_arrow@3x.png" alt=""/>
                        </div>
                        <SegmentedControl
                            selectedIndex={segmentedSelectedIndex}
                            className={styles.segmented}
                            tintColor="#000"
                            values={['周', '月', '年']}
                            onChange={(e)=>onSegmentedChange(e.nativeEvent.selectedSegmentIndex)}
                        />
                    </div>
                    <List className={styles.tallyselect}
                          style={{display:tallySelectShow?"block":"none"}} >
                        <List.Item
                            thumb={<img src="/static/images/tally_select_expenditure@3x.png" alt=""/>}
                            extra={classify==="支出"?<img src="/static/images/tally_checrmark@3x.png" alt=""/>:null}
                            onClick={()=>tallySelect("支出")}
                        >
                            支出
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/tally_select_income@3x.png" alt=""/>}
                            extra={classify==="收入"?<img src="/static/images/tally_checrmark@3x.png" alt=""/>:null}
                            onClick={()=>tallySelect("收入")}
                        >
                            收入
                        </List.Item>
                    </List>
                </header>
                <div className={styles.main}>
                    {/*蒙层*/}
                    <div className={styles.mask}
                         style={{display:tallySelectShow?"block":"none"}}
                         onClick={maskClick} />
                    <MyTabs />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Chart;
