import React from 'react';
import {observer} from "mobx-react";
import {goBack, goto} from "utils/go";
import styles from './UserInfos.less';
import {Icon, List, Button} from 'antd-mobile';
import {globalStore} from "stores/GlobalStore";
import {loginStore} from "stores/LoginStore";
import './UserInfos.module.less';
import {ActionSheet} from "antd-mobile";

@observer
class UserInfos extends React.Component {
    render() {
        const {user} = globalStore;
        return (
            <div className={cx(styles.container, "userInfos-container")}>
                <header>
                    <div className={styles.backto} onClick={goBack}>
                        <Icon type="left" size='lg' className={styles.backIcon}/>
                        <span>返回</span>
                    </div>
                    注册
                </header>
                <div className={styles.main}>
                    <List>
                        <List.Item
                            extra={<img src="/static/images/default_avatar.png" alt=""/>}
                            onClick={this.avatarChange}
                        >
                            头像
                        </List.Item>
                        <List.Item extra={user.get("uid")}>ID</List.Item>
                        <List.Item
                            extra={<span>{user.get("nickname") || <span className={styles.unset}>未设置</span>} <Icon type="right"/></span>}
                            onClick={()=>{}}
                        >
                            昵称
                        </List.Item>
                        <List.Item
                            extra={<span>{user.get("sex") || <span className={styles.unset}>未设置</span>} <Icon type="right"/></span>}
                            onClick={this.sexChange}
                        >
                            性别
                        </List.Item>
                        <List.Item
                            extra={<span>{user.get("username") || <span className={styles.unset}>未绑定</span>} <Icon type="right"/></span>}
                            onClick={()=>{}}
                        >
                            手机号
                        </List.Item>
                        <List.Item
                            extra={<span>{user.get("wechat") || <span className={styles.unset}>未绑定</span>} <Icon type="right"/></span>}
                            onClick={()=>{}}
                        >
                            微信
                        </List.Item>
                    </List>
                    <Button className={styles.btnLogout} onClick={this.logout}>退出登录</Button>
                </div>
            </div>
        );
    }

    avatarChange=()=>{
        const BUTTONS = ['拍照', '从相册选择', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                // destructiveButtonIndex: BUTTONS.length - 2,
                // title: 'title',
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
                // wrapProps,
            },
            (buttonIndex) => {
                const text = BUTTONS[buttonIndex];
                switch (text) {
                    case "拍照": break;
                    case "从相册选择": break;
                }
            });
    };

    sexChange=()=>{
        const BUTTONS = ['男', '女', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                // destructiveButtonIndex: BUTTONS.length - 2,
                // title: 'title',
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
                // wrapProps,
            },
            (buttonIndex) => {
                const text = BUTTONS[buttonIndex];
                switch (text) {
                    case "男":
                    case "女":
                        break;
                }
            });
    };

    logout=()=>{
        const {logout} = loginStore;
        const BUTTONS = ['退出登录', '取消'];
        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length - 1,
                destructiveButtonIndex: BUTTONS.length - 2,
                // title: 'title',
                message: '退出后不会删除任何历史数据，下次登录依然可以使用本账号',
                maskClosable: true,
                'data-seed': 'logId',
                // wrapProps,
            },
            (buttonIndex) => {
                const text = BUTTONS[buttonIndex];
                switch (text) {
                    case "退出登录": logout(); break;
                }
            });
    };
}

export default UserInfos;
