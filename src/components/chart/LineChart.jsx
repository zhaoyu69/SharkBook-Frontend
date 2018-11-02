import React from 'react';
import {observer} from "mobx-react";
import ReactEcharts from 'echarts-for-react';
import styles from './LineChart.less';
import {chartStore as store} from "stores/ChartStore";
import {toJS} from "mobx";

@observer
class LineChart extends React.Component {
    weekOptions=()=>{
        const {classify, getTotal, getAverage, getMax} = store;
        const dates = toJS(store.chartxAxis);
        const accounts = toJS(store.tabAccounts);
        console.log("weekAccounts:", accounts);

        const total = getTotal(accounts);
        const average = getAverage(total);

        let xAxisData = [];
        let seriesData = [];

        dates.map((date, idx) => {
            xAxisData.push({
                value: (()=>{
                    if(date.startOf('day').isSame(moment().startOf('day'))) {
                        return '今天'
                    } else {
                        return date.format('MM-DD')
                    }
                })(),
                textStyle: (()=>{
                    if(idx === 0) {
                        return {padding: [0, 0, 0, 20]}
                    } else if (idx === dates.length - 1) {
                        return {padding: [0, 20, 0, 0]}
                    } else {
                        return {}
                    }
                })()
            });
            // 当天的账单
            const _accounts = accounts.filter(acc => moment(acc.time.iso).startOf('day').isSame(date.startOf('day')));
            const totalPrice = _.sumBy(_accounts, (acc) => acc.price);
            seriesData.push(totalPrice?totalPrice : 0.00);
        });

        const max = getMax(seriesData);

        return {
            title: {
                text: `总${classify}：${total}`,
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "12",
                    color: "#9a9a9a"
                },
                subtext: `平均值：${average}`,
                subtextStyle: {
                    fontSize: "10",
                },
                itemGap: 4
            },
            xAxis: {
                classify: 'category',
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
                data: xAxisData
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
                data: seriesData,
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
                        yAxis: average,
                        lineStyle: {
                            color: "#9a9a9a"
                        },
                    }, {
                        yAxis: max,
                        lineStyle: {
                            color: "#9a9a9a",
                            type: "solid"
                        },
                    }]
                }
            }]
        };
    };
    monthOptions=()=>{
        const {classify, getTotal, getAverage, getMax} = store;
        const dates = toJS(store.chartxAxis);
        const accounts = toJS(store.tabAccounts);
        console.log("monthAccounts:", accounts);

        const total = getTotal(accounts);
        const average = getAverage(total);

        let xAxisData = [];
        let seriesData = [];

        dates.map((date, idx) => {
            xAxisData.push({
                value: date,
                textStyle: (()=>{
                    if(idx === 0) {
                        return {padding: [0, 0, 0, 20]}
                    } else if (idx === dates.length - 1) {
                        return {padding: [0, 20, 0, 0]}
                    } else {
                        return {}
                    }
                })()
            });
            // 当天的账单
            const _accounts = accounts.filter(acc => moment(acc.time.iso).date() === date);
            const totalPrice = _.sumBy(_accounts, (acc) => acc.price);
            seriesData.push(totalPrice?totalPrice : 0.00);
        });

        const max = getMax(seriesData);

        return {
            title: {
                text: `总${classify}：${total}`,
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "12",
                    color: "#9a9a9a"
                },
                subtext: `平均值：${average}`,
                subtextStyle: {
                    fontSize: "10",
                },
                itemGap: 4
            },
            xAxis: {
                classify: 'category',
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
                data: xAxisData
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
                data: seriesData,
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
                        yAxis: average,
                        lineStyle: {
                            color: "#9a9a9a"
                        },
                    }, {
                        yAxis: max,
                        lineStyle: {
                            color: "#9a9a9a",
                            type: "solid"
                        },
                    }]
                }
            }]
        };
    };
    yearOptions=()=>{
        const {classify, getTotal, getAverage, getMax} = store;
        const dates = toJS(store.chartxAxis);
        const accounts = toJS(store.tabAccounts);
        console.log("yearAccounts:", accounts);

        const total = getTotal(accounts);
        const average = getAverage(total);

        let xAxisData = [];
        let seriesData = [];

        dates.map((date, idx) => {
            xAxisData.push({
                value: `${date}月`,
                textStyle: (()=>{
                    if(idx === 0) {
                        return {padding: [0, 0, 0, 20]}
                    } else if (idx === dates.length - 1) {
                        return {padding: [0, 20, 0, 0]}
                    } else {
                        return {}
                    }
                })()
            });
            // 当月的账单
            const _accounts = accounts.filter(acc => moment(acc.time.iso).month()+1 === date);
            const totalPrice = _.sumBy(_accounts, (acc) => acc.price);
            seriesData.push(totalPrice?totalPrice : 0.00);
        });

        const max = getMax(seriesData);

        return {
            title: {
                text: `总${classify}：${total}`,
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "12",
                    color: "#9a9a9a"
                },
                subtext: `平均值：${average}`,
                subtextStyle: {
                    fontSize: "10",
                },
                itemGap: 4
            },
            xAxis: {
                classify: 'category',
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
                data: xAxisData
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
                data: seriesData,
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
                        yAxis: average,
                        lineStyle: {
                            color: "#9a9a9a"
                        },
                    }, {
                        yAxis: max,
                        lineStyle: {
                            color: "#9a9a9a",
                            type: "solid"
                        },
                    }]
                }
            }]
        };
    };

    getOption=()=>{
        const {segmentedSelectedIndex} = store;
        switch (segmentedSelectedIndex) {
            case 0: return this.weekOptions();
            case 1: return this.monthOptions();
            case 2: return this.yearOptions();
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <ReactEcharts
                    option={this.getOption()}
                    // notMerge={true}
                    lazyUpdate={true}
                    // theme={"theme_name"}
                    // onChartReady={this.onChartReadyCallback}
                    className={styles.lineChart}
                    // onEvents={EventsDict}
                    // opts={}
                />
            </div>
        );
    }
}

export default LineChart;
