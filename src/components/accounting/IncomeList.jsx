import React from 'react';
import {observer} from "mobx-react";
import {Flex} from 'antd-mobile';
import styles from './IncomeList.less';
import {toJS} from 'mobx';

@observer
class IncomeList extends React.Component {
    render() {
        const {store} = this.props;
        const incomeList = toJS(store.c_IncomeList);
        const items = incomeList.map((line, idx) => {
            return (
                <Flex key={idx}>
                    {line.map(item => {
                        const {key, title, src, activeSrc, active} = item;
                        return (
                            <Flex.Item key={key} className={styles.item}>
                                <div onClick={()=>store.incomeItemClick(item)}>
                                    <img src={!active?src:activeSrc} alt="" className={styles.itemImg}/>
                                    <p className={styles.itemTitle}>{title}</p>
                                </div>
                            </Flex.Item>
                        )}
                    )}
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
