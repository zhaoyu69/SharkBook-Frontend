import React from 'react';
import {observer} from "mobx-react";
import {List, Progress} from "antd-mobile";
import styles from './Leaderboard.less';
import "./Leaderboard.module.less";

@observer
class Leaderboard extends React.Component {
    render() {
        return (
            <div className={cx(styles.container, "leaderboard-container")}>
                <p className={styles.title}>支出排行榜</p>
                <List className={styles.list}>
                    <List.Item
                        thumb={<img src="/static/images/e_books_l@3x.png" alt=""/>}
                        className={styles.listItem}
                    >
                        <div className={styles.listContent}>
                            <div className={styles.text}>
                                <span className={styles.text_l}>餐饮 100%</span>
                                <span className={styles.text_r}>66</span>
                            </div>
                            <Progress
                                percent={100}
                                style={{borderRadius: "30px"}}
                                barStyle={{color:"#fed953", border:"2px solid #fed953",borderRadius: "30px"}}
                                position={"normal"}
                            />
                        </div>
                    </List.Item>
                </List>
            </div>
        );
    }
}

export default Leaderboard;
