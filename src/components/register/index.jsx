import React from 'react';
import {observer} from "mobx-react";
import styles from './index.less';
import {Icon, List, InputItem, Toast, Button} from 'antd-mobile';
import {goBack} from "utils/go";
import {registerStore} from "stores/RegisterStore";
import './index.module.less';

@observer
class Register extends React.Component {
    onErrorClick = (type) => {
        const {hasPhoneNumberError, hasPassword1Error, hasPassword2Error} = registerStore;
        switch (type) {
            case "phoneNumber":
                if(hasPhoneNumberError){
                    Toast.info("请输入正确的手机号!", 1)
                }
                break;
            case "password1":
                if(hasPassword1Error){
                    Toast.info("密码长度不够!", 1)
                }
                break;
            case "password2":
                if(hasPassword2Error){
                    Toast.info("两次密码不相同!", 1)
                }
                break;
        }
    };
    render() {
        const {phoneNumber, password1, password2,
            hasPhoneNumberError, hasPassword1Error, hasPassword2Error,
            phoneNumberChange, password1Change, password2Change,
            hasError, register} = registerStore;
        return (
            <div className={cx(styles.container, "register-container")}>
                <header>
                    <div className={styles.backto} onClick={goBack}>
                        <Icon type="left" size='lg' className={styles.backIcon}/>
                        <span>返回</span>
                    </div>
                    注册
                </header>
                <div className={styles.main}>
                    <List>
                        <InputItem
                            type="phone"
                            placeholder="请输入手机号"
                            error={hasPhoneNumberError}
                            onErrorClick={()=>this.onErrorClick("phoneNumber")}
                            onChange={phoneNumberChange}
                            value={phoneNumber}
                        >
                            手机号
                        </InputItem>
                        <InputItem
                            type="password"
                            placeholder="请输入密码"
                            error={hasPassword1Error}
                            onErrorClick={()=>this.onErrorClick("password1")}
                            onChange={password1Change}
                            value={password1}
                        >
                            密码
                        </InputItem>
                        <InputItem
                            type="password"
                            placeholder="请再次输入密码"
                            error={hasPassword2Error}
                            onErrorClick={()=>this.onErrorClick("password2")}
                            onChange={password2Change}
                            value={password2}
                        >
                            确认密码
                        </InputItem>
                    </List>
                    <Button type="primary" className={styles.btnRegister} disabled={hasError} onClick={register}>注册</Button>
                </div>
            </div>
        );
    }
}

export default Register;
