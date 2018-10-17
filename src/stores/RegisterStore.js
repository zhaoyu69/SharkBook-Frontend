import { observable, action, computed } from "mobx";
import {goto} from "utils/go";
import {Toast} from 'antd-mobile';
import UserService from "services/UserService";

export default class RegisterStore{
    @observable phoneNumber="";
    @observable password1="";
    @observable password2="";

    @action phoneNumberChange=(phoneNumber)=>{
        this.phoneNumber=phoneNumber;
    };
    @action password1Change=(password1)=>{
        this.password1=password1;
    };
    @action password2Change=(password2)=>{
        this.password2=password2;
    };
    // 手机号是否有错
    @computed get hasPhoneNumberError(){
        return this.phoneNumber && this.phoneNumber.replace(/\s/g, '').length < 11;
    }
    // 密码是否有错
    @computed get hasPassword1Error(){
        return this.password1 && this.password1.replace(/\s/g, '').length < 6;
    }
    // 确认密码是否有错
    @computed get hasPassword2Error(){
        return this.password2 && (this.password2 !== this.password1);
    }
    // 表单是否有错
    @computed get hasError(){
        if(this.phoneNumber && this.password1 && this.password2){
            return this.hasPhoneNumberError || this.hasPassword1Error || this.hasPassword2Error;
        }
        return true;
    }

    // 注册
    @action register=async()=>{
        const user = await UserService.register(this.phoneNumber.replace(/\s/g, ''), this.password1);
        if(user) {
            // 注册成功
            Toast.success("注册成功!", 1);
            goto("/login/phone");
        }
    };
}

export const registerStore = new RegisterStore();