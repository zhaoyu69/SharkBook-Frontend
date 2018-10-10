import React from 'react';
import {observer} from "mobx-react";
import {Flex} from 'antd-mobile';
import styles from './IncomeList.less';
import incomeList from 'utils/incomeList';
const lines = _.chunk(incomeList, 4);

@observer
class IncomeList extends React.Component {
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

export default IncomeList;
