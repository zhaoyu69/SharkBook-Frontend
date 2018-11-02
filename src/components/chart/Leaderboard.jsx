import React from 'react';
import {observer} from "mobx-react";
import {List, Progress} from "antd-mobile";
import styles from './Leaderboard.less';
import "./Leaderboard.module.less";
import {toJS} from "mobx";
import {chartStore as store} from "stores/ChartStore";
import NoData from "components/noData/NoData";

@observer
class Leaderboard extends React.Component {
    render() {
        const accounts = toJS(store.tabAccounts);
        const {getTotal, getPercent} = store;
        const total = getTotal(accounts);
        return (
            <div className={cx(styles.container, "leaderboard-container")}>
                <p className={styles.title}>支出排行榜</p>
                {!accounts.length ?
                    <NoData /> :
                    <List className={styles.list}>
                        {accounts.map((acc, idx) => {
                            const {price, userType} = acc;
                            const {type} = userType;
                            const percent = getPercent(price, total);
                            return (
                                <List.Item
                                    key={idx}
                                    thumb={<img src={type.listIcon} alt=""/>}
                                    className={styles.listItem}
                                >
                                    <div className={styles.listContent}>
                                        <div className={styles.text}>
                                            <span className={styles.text_l}>{type.name} {percent}%</span>
                                            <span className={styles.text_r}>{price}</span>
                                        </div>
                                        <Progress
                                            unfilled={false}
                                            percent={percent}
                                            style={{borderRadius: "30px"}}
                                            barStyle={{
                                                color: "#fed953",
                                                border: "2px solid #fed953",
                                                borderRadius: "30px"
                                            }}
                                            position={"normal"}
                                        />
                                    </div>
                                </List.Item>
                            )
                        })}
                    </List>
                }
            </div>
        );
    }
}

export default Leaderboard;
