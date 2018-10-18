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
        const {isLogin, user} = globalStore;
        const avatar = isLogin?"/static/images/default_avatar.png":"/static/images/nologin_header@3x.png";
        const username = isLogin?user.get("nickname"):"未登录";
        const avatarClick = ()=>goto(isLogin?"/mine/userInfos":"/login/wechat");

        return (
            <div className={styles.container}>
                <header>
                    <div className={styles.punch}>
                        <img src="/static/images/upgrade_calendar@3x.png" alt=""/>
                        <span>打卡</span>
                    </div>
                    <dl className={styles.user} onClick={avatarClick}>
                        <dt><img src={avatar} alt=""/></dt>
                        <dd>{username}</dd>
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
