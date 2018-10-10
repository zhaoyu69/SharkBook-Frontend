import React from 'react';
import {observer} from "mobx-react";
import {Flex} from 'antd-mobile';
import styles from './PayList.less';
import {toJS} from 'mobx';

@observer
class PayList extends React.Component {
    render() {
        const {store} = this.props;
        const payList = toJS(store.c_PayList);
        const items = payList.map((line, idx) => {
            return (
                <Flex key={idx}>
                    {line.map(item => {
                        const {title, src, activeSrc, active} = item;
                        return (
                            <Flex.Item key={title} className={styles.item}>
                                <div onClick={()=>store.payItemClick(item)}>
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

export default PayList;
