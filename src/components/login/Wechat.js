import React from 'react';
import {observer} from "mobx-react";
import styles from './Wechat.less';
import {Button, ActionSheet} from 'antd-mobile';
import {goBack, goto} from "utils/go";

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
if (isIPhone) {
    wrapProps = {
        onTouchStart: e => e.preventDefault(),
    };
}

@observer
class WechatLogin extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <img src="/static/images/login_close@3x.png" alt="" className={styles.btnClose} onClick={goBack}/>
                <img src="/static/images/login_icon@3x.png" alt="" className={styles.loginIcon}/>
                <Button type="primary" className={styles.btnWechat}>微信登录</Button>
                <p className={styles.moreWays} onClick={this.showMoreWays}>更多登录方式</p>
            </div>
        );
    }

    showMoreWays = () => {
        const BUTTONS = ['注册', '手机登录', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                // destructiveButtonIndex: BUTTONS.length - 2,
                // title: 'title',
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
                wrapProps,
            },
            (buttonIndex) => {
                const text = BUTTONS[buttonIndex];
                switch (text) {
                    case "注册": goto('/register'); break;
                    case "手机登录": goto('/login/phone'); break;
                }
            });
    }
}

export default WechatLogin;
