import React from 'react';
import {observer} from "mobx-react";
import styles from './Phone.less';
import {goto} from "utils/go";
import {loginStore} from "stores/LoginStore";
import {List, InputItem, Button} from "antd-mobile";
import "./Phone.module.less";

@observer
class PhoneLogin extends React.Component {
    render() {
        const {username, password,
            usernameChange, passwordChange,
            login, isPwdVisible, pwdVisibleChange} = loginStore;
        return (
            <div className={cx(styles.container, "login-container")}>
                <img src="/static/images/login_close@3x.png" alt="" className={styles.btnClose} onClick={()=>goto('/mine')}/>
                <div className={styles.main}>
                    <List>
                        <InputItem
                            type="phone"
                            placeholder="请输入手机号"
                            onChange={usernameChange}
                            value={username}
                            clear={true}
                        >
                            手机号
                        </InputItem>
                        <InputItem
                            type={isPwdVisible?"text":"password"}
                            placeholder="请输入密码"
                            extra={<img src={isPwdVisible?"/static/images/eye_open@3x.png":"/static/images/eye_close@3x.png"} alt=""/>}
                            onExtraClick={pwdVisibleChange}
                            onChange={passwordChange}
                            value={password}
                        >
                            密码
                        </InputItem>
                    </List>
                    <Button type="primary" className={styles.btnLogin} onClick={login}>登录</Button>
                    <div className={styles.opera}>
                        <span className={styles.findoutPwd}>找回密码</span>
                        <span className={styles.register} onClick={()=>goto("/register")}>注册</span>
                    </div>
                    <div className={styles.otherWays}>
                        <span className={styles.text}>其他方式登录</span>
                        <p className={styles.line}> </p>
                    </div>
                    <Button type="primary" className={cx(styles.btnLogin, styles.btnWechatLogin)} onClick={()=>goto("/login/wechat")}>微信登录</Button>
                </div>
            </div>
        );
    }
}

export default PhoneLogin;
