import { observable, action, computed } from "mobx";

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

    @computed get hasPhoneNumberError(){
        return this.phoneNumber && this.phoneNumber.replace(/\s/g, '').length < 11
    }
    @computed get hasPassword1Error(){
        return this.password1 && this.password1.replace(/\s/g, '').length < 6
    }
    @computed get hasPassword2Error(){
        return this.password2 && (this.password2 !== this.password1);
    }
}

export const registerStore = new RegisterStore();