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
                text: `总${type}：66.00`,
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "12",
                    color: "#9a9a9a"
                },
                subtext: "平均值：13.20",
                subtextStyle: {
                    fontSize: "10",
                },
                itemGap: 4
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    lineStyle: {
                        width: 0
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "#9a9a9a"
                    }
                },
                axisLabel: {
                    fontSize: 10,
                    margin: 5,
                },
                data: [{
                    value: '10-22',
                    textStyle: {
                        padding: [0, 0, 0, 20]
                    }
                }, '10-23', '10-24', '10-25', '今天', '10-27', {
                    value: '10-28',
                    textStyle: {
                        padding: [0, 20, 0, 0]
                    }
                }]
            },
            yAxis: {
                show: false,
                boundaryGap: false
            },
            tooltip: {
                show: true,
                confine: true,
            },
            grid: {
                top: 40,
                left: 5,
                right: 5,
                bottom: 20
            },
            series: [{
                data: [66, 0, 0, 0, 0, 0, 0],
                type: 'line',
                lineStyle: {
                    color: "#000",
                    width: 1
                },
                itemStyle: {
                    color: "#fed953",
                    borderColor: "#000",
                },
                markLine: {
                    silent: true,
                    symbol: false,
                    data: [{
                        yAxis: 13.20,
                        lineStyle: {
                            color: "#9a9a9a"
                        },
                    },{
                        yAxis: 66,
                        lineStyle: {
                            color: "#9a9a9a",
                            type: "solid"
                        },
                    }]
                }
            }]
        };
    };
    onChartReadyCallback=(...args)=>{
        // console.log(args);
    };
    render() {
        return (
            <div className={styles.container}>
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
