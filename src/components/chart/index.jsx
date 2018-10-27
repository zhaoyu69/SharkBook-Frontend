import React from 'react';
import {observer} from "mobx-react";
import Footer from "components/footer";
import styles from './index.less';
import {SegmentedControl, List} from 'antd-mobile';
import './index.module.less';
import MyTabs from "./MyTabs";

@observer
class Chart extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tallySelected: "支出",
            tallySelectShow: false,
            segmentedSelectedIndex: 0
        };
    }

    checkout=()=>{
        this.setState({
            tallySelectShow: !this.state.tallySelectShow
        })
    };

    maskClick=()=>{
        this.setState({tallySelectShow:false});
    };

    tallySelect=(type)=>{
        this.setState({
            tallySelected: type,
            tallySelectShow: false
        })
    };

    render() {
        const {tallySelectShow, segmentedSelectedIndex, tallySelected} = this.state;
        return (
            <div className={cx(styles.container, "chart-container")}>
                <header>
                    <div>
                        <div className={styles.checkout} onClick={this.checkout}>
                            <span>{tallySelected}</span>
                            <img src="/static/images/tally_arrow@3x.png" alt=""/>
                        </div>
                        <SegmentedControl
                            selectedIndex={segmentedSelectedIndex}
                            className={styles.segmented}
                            tintColor="#000"
                            values={['周', '月', '年']}
                            onChange={this.onSegmentedChange}
                            onValueChange={this.onSegmentedValueChange}
                        />
                    </div>
                    <List className={styles.tallyselect}
                          style={{display:tallySelectShow?"block":"none"}} >
                        <List.Item
                            thumb={<img src="/static/images/tally_select_expenditure@3x.png" alt=""/>}
                            extra={tallySelected==="支出"?<img src="/static/images/tally_checrmark@3x.png" alt=""/>:null}
                            onClick={()=>this.tallySelect("支出")}
                        >
                            支出
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/tally_select_income@3x.png" alt=""/>}
                            extra={tallySelected==="收入"?<img src="/static/images/tally_checrmark@3x.png" alt=""/>:null}
                            onClick={()=>this.tallySelect("收入")}
                        >
                            收入
                        </List.Item>
                    </List>
                </header>
                <div className={styles.main}>
                    {/*蒙层*/}
                    <div className={styles.mask}
                         style={{display:tallySelectShow?"block":"none"}}
                         onClick={this.maskClick} />
                    {this.segmentes()}
                </div>
                <Footer />
            </div>
        );
    }

    segmentes=()=>{
        const {segmentedSelectedIndex} = this.state;
        switch (segmentedSelectedIndex) {
            case 0: return <MyTabs
                tabs={[
                    {title: "上周", page: 0},
                    {title: "本周", page: 1}
                ]}
            />;
            case 1: return <MyTabs
                tabs={[
                    {title: "本月", page: 0},
                ]}
            />;
            case 2: return <MyTabs
                tabs={[
                    {title: "今年", page: 0},
                ]}
            />;
        }
    };

    onSegmentedChange = (e) => {
        // console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
        this.setState({segmentedSelectedIndex: e.nativeEvent.selectedSegmentIndex})
    };

    onSegmentedValueChange = (value) => {
        // console.log(value);
    }
}

export default Chart;
