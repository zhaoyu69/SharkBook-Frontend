import React from 'react';
import {observer} from "mobx-react";
import LineChart from "components/chart/LineChart";
import Leaderboard from "components/chart/Leaderboard";

// import styles from './TabContent.less';

@observer
class TabContent extends React.Component {
    render() {
        return (
            <div>
                <LineChart {...this.props}/>
                <Leaderboard />
            </div>
        );
    }
}

export default TabContent;
