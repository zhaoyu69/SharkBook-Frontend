import { observable, action, computed } from "mobx";
import UserService from "services/UserService";
import {globalStore} from "stores/GlobalStore";
import {Toast} from 'antd-mobile';

export default class UserStore{
    @observable user=globalStore.user;

    // 获取用户属性
    @action getUser=async()=>{
        this.user = await UserService.getUser(globalStore.userId);
    };

    // 修改用户属性
    @action updateUserInfo=async(type, value)=>{
        const user = await UserService.updateUserInfo(this.user.id, type, value);
        if(user) {
            this.getUser();
            Toast.success("修改成功!", 1);
        }
    };
}

export const userStore = new UserStore();