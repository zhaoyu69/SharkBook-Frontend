import React from 'react';
import {observer} from "mobx-react";
import ReactEcharts from 'echarts-for-react';
import styles from './LineChart.less';
import {chartStore as store} from "stores/ChartStore";
import {toJS} from "mobx";

@observer
class LineChart extends React.Component {
    weekOptions=(page)=>{
        const {classify} = store;
        const currentWeekAccounts = toJS(store.currentWeekAccounts);
        const lastWeekAccounts = toJS(store.lastWeekAccounts);
        const weekDates = toJS(store.weekDates);
        const lastWeekDates = toJS(store.lastWeekDates);
        let accounts = !page?lastWeekAccounts : currentWeekAccounts;
        console.log(accounts);

        let dates = !page?lastWeekDates : weekDates;
        let xAxisData = [];
        let datesLen = dates.length;
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
                    } else if (idx === datesLen - 1) {
                        return {padding: [0, 20, 0, 0]}
                    } else {
                        return {}
                    }
                })()
            })
        });
        return {
            title: {
                text: `总${classify}：66.00`,
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
                    }, {
                        yAxis: 66,
                        lineStyle: {
                            color: "#9a9a9a",
                            classify: "solid"
                        },
                    }]
                }
            }]
        };
    };
    monthOptions=(accounts)=>{
        const {classify} = store;
        return {
            title: {
                text: `总${classify}：66.00`,
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
                    }, {
                        yAxis: 66,
                        lineStyle: {
                            color: "#9a9a9a",
                            classify: "solid"
                        },
                    }]
                }
            }]
        };
    };
    yearOptions=(accounts)=>{
        const {classify} = store;
        return {
            title: {
                text: `总${classify}：66.00`,
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
                    }, {
                        yAxis: 66,
                        lineStyle: {
                            color: "#9a9a9a",
                            classify: "solid"
                        },
                    }]
                }
            }]
        };
    };

    getOption=()=>{
        // pageIndex 0,1,2代表周月年
        // page 0,1代表tabs的page
        const {pageIndex} = this.props;
        const pages = toJS(store.pages);
        const currentMonthAccounts = toJS(store.currentMonthAccounts);
        const currentYearAccounts = toJS(store.currentYearAccounts);
        const page = pages[pageIndex];

        switch (pageIndex) {
            case 0: return this.weekOptions(page);
            case 1: return this.monthOptions(currentMonthAccounts);
            case 2: return this.yearOptions(currentYearAccounts);
        }
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
