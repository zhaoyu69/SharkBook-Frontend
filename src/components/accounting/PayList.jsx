import React from 'react';
import {observer} from "mobx-react";
import {Flex} from 'antd-mobile';
import styles from './PayList.less';
import payList from 'utils/payList';
const lines = _.chunk(payList, 4);

@observer
class PayList extends React.Component {
    render() {
        const items = lines.map((line, idx) => {
            return (
                <Flex key={idx}>
                    {line.map(item => <Flex.Item key={item.title} className={styles.item}>
                        <img src={item.src} alt="" className={styles.itemImg}/>
                        <p className={styles.itemTitle}>{item.title}</p>
                    </Flex.Item> )}
                </Flex>
            )
        });
        return (
            <div>
                {items}
            </div>
        );
    }
}

export default PayList;
