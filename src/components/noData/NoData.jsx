import React from 'react';
import {observer} from "mobx-react";
import styles from './NoData.less';

@observer
class NoData extends React.Component {
    render() {
        return (
            <div className={styles.noData}>
                <img src="/static/images/no_data@3x.png" alt=""/>
                <p>暂无数据</p>
            </div>
        );
    }
}

export default NoData;
