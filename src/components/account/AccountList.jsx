import React from 'react';
import {observer} from "mobx-react";
import styles from './AccountList.less';
import {accountStore as store} from "stores/AccountStore";

@observer
class AccountList extends React.Component {
    render() {
        const {list} = this.props;
        const items = list.map((item, idx) => {
            const {name, icon, activeIcon, active} = item;
            return (
                <li key={idx} onClick={()=>store.listItemClick(list, item)} className={styles.item}>
                    <img src={!active?icon:activeIcon} alt="" className={styles.itemImg}/>
                    <p className={styles.itemTitle}>{name}</p>
                </li>
            )
        });
        return (
            <ul className={styles.container}>
                {items}
                <li onClick={()=>{}} className={styles.item}>
                    <img src="/static/images/tallytype_set@3x.png" alt="" className={styles.itemImg}/>
                    <p className={styles.itemTitle}>设置</p>
                </li>
            </ul>
        );
    }
}

export default AccountList;
