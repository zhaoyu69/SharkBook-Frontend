import React from 'react';
import {observer} from "mobx-react";
import {Flex} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";
import Footer from "components/footer";
import {goto} from "utils/go";

@observer
class Mine extends React.Component {
    render() {
        const {isLogin} = globalStore;
        return (
            <div className={styles.container}>
                <header>
                    <div className={styles.punch}>
                        <img src="/static/images/upgrade_calendar@3x.png" alt=""/>
                        <span>打卡</span>
                    </div>
                    <dl className={styles.user} onClick={()=>goto("/login/wechat")}>
                        <dt><img src="/static/images/nologin_header@3x.png" alt=""/></dt>
                        <dd>未登录</dd>
                    </dl>
                    <Flex className={styles.overview}>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>已连续打卡</p>
                        </Flex.Item>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>记账总天数</p>
                        </Flex.Item>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>记账总笔数</p>
                        </Flex.Item>
                    </Flex>
                </header>
                <div className={styles.main}>

                </div>
                <Footer />
            </div>
        );
    }
}

export default Mine;
