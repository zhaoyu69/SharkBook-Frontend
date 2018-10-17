import { observable, action, computed } from "mobx";
import {Toast} from "antd-mobile";
import {goto} from "utils/go";
import UserService from "services/UserService";

export default class LoginStore{
    @observable username="";
    @observable password="";
    @observable isPwdVisible=false; //密码是否可见

    @action usernameChange=(username)=>{
        this.username=username;
    };
    @action passwordChange=(password)=>{
        this.password=password;
    };

    @action pwdVisibleChange=()=>{
        this.isPwdVisible = !this.isPwdVisible;
    };

    // 登录
    @action login=async()=>{
        const [username, password] = [this.username.replace(/\s/g, ''), this.password];
        if(!username) {
            Toast.info("请输入手机号!", 1);
        }else if(username.length < 11) {
            Toast.info("请输入正确的手机号!", 1);
        }else if(!password) {
            Toast.info("请输入密码!", 1);
        }else {
            try {
                const user = await UserService.login(username, password);
                if(user) {
                    // 登录成功
                    Toast.success("登录成功!", 1);
                    goto("/mine");
                }
            }catch(e) {
                Toast.fail(e.message, 1);
            }
        }
    };

    // 退出登录
    @action logout=async()=>{
        await UserService.logout();
        goto("/mine");
    }
}

export const loginStore = new LoginStore();