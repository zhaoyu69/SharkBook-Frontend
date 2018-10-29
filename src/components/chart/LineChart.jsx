import React from 'react';
import {observer} from "mobx-react";
import ReactEcharts from 'echarts-for-react';
import styles from './LineChart.less';

@observer
class LineChart extends React.Component {
    getOption=()=>{
        const {type} = this.props;
        return {
            title: {
                text: `总${type}：`,
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "12"
                },
                subtext: "平均值：",
                subtextStyle: {
                    fontSize: "10",
                },
                itemGap: 3
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    lineStyle: {
                        width: 0
                    }
                },
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                show: false
            },
            grid: {
                left: 5,
                right: 5,
                bottom: 20
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                lineStyle: {
                    color: "#000",
                    width: 1
                },
                itemStyle: {
                    color: "#fed953",
                    borderColor: "#000",

                }
            }]
        };
    };
    onChartReadyCallback=(...args)=>{
        console.log(args);
    };
    render() {
        return (
            <div>
                <ReactEcharts
                    option={this.getOption()}
                    notMerge={true}
                    lazyUpdate={true}
                    theme={"theme_name"}
                    onChartReady={this.onChartReadyCallback}
                    className={styles.lineChart}
                    // onEvents={EventsDict}
                    // opts={}
                />
            </div>
        );
    }
}

export default LineChart;
