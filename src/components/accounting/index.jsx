import React from 'react';
import {observer} from "mobx-react";
import {Button} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";

@observer
class Accounting extends React.Component {
    render() {
        return (
            <div id="accounting_wrap" className={styles.container}>
                <Button type="primary" onClick={globalStore.closeAccounting}>取消</Button>
            </div>
        );
    }
}

export default Accounting;
