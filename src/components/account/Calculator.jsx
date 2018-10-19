import React from 'react';
import {observer} from "mobx-react";
import styles from './Calculator.less';
import {Toast, DatePicker} from 'antd-mobile';
import {toJS} from "mobx";
import {accountStore as store} from "stores/AccountStore";

@observer
class Calculator extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {totalPrice, calCompleted, writeRemarks, remarks, isToday, timeSelect, accTime} = store;
        return (
            <div className={styles.calculator}>
                <div className={styles.line}>
                    <div className={styles.remark}>备注:
                        <input className={styles.remark_input}
                               placeholder={"点击写备注..."}
                               onChange={(e)=>writeRemarks(e.target.value)}
                               value={remarks}/>
                    </div>
                    <div className={styles.price}>{totalPrice}</div>
                </div>
                <table className={styles.keyboard} cellSpacing="0" cellPadding="0" >
                    <tbody>
                    <tr>
                        <td onClick={this.keyClick}>7</td>
                        <td onClick={this.keyClick}>8</td>
                        <td onClick={this.keyClick}>9</td>
                        <td>
                            <DatePicker
                                mode="date"
                                title="选择日期"
                                extra="Optional"
                                className={styles.datePicker}
                                onOk={timeSelect}
                            >
                                <div>{isToday?"今天":moment(accTime).format('YYYY/MM/DD')}</div>
                            </DatePicker>
                        </td>
                    </tr>
                    <tr>
                        <td onClick={this.keyClick}>4</td>
                        <td onClick={this.keyClick}>5</td>
                        <td onClick={this.keyClick}>6</td>
                        <td onClick={this.keyClick}>+</td>
                    </tr>
                    <tr>
                        <td onClick={this.keyClick}>1</td>
                        <td onClick={this.keyClick}>2</td>
                        <td onClick={this.keyClick}>3</td>
                        <td onClick={this.keyClick}>-</td>
                    </tr>
                    <tr>
                        <td onClick={this.keyClick}>.</td>
                        <td onClick={this.keyClick}>0</td>
                        <td className={styles.backSign} onClick={this.backClick}>
                            <img src="/static/images/tally_keyboard_del@3x.png" alt=""/>
                        </td>
                        <td className={styles.equalSign} onClick={this.calClick}>{calCompleted?"完成":"="}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    keyClick = (e) => {
        const {totalPrice} = store;
        const key = e.target.innerHTML;
        // 负数问题 ok
        const lastone = totalPrice[totalPrice.length-1];
        const firstone = totalPrice[0];
        switch (key) {
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                // 初始为0 直接显示数字
                if(totalPrice==="0.00"||totalPrice==="0"){
                    store.totalPrice = "";
                }
                store.totalPrice += key;
                break;
            case "0":
                store.totalPrice += key;
                break;
            case ".":
                // + - 在末尾 按. 前面补0
                if(lastone==="+"||lastone==="-"){
                    store.totalPrice += "0";
                }
                // .在末尾 不再加.
                else if(lastone==="."){
                    return;
                }
                store.totalPrice += key;
                break;
            case "+":
                if(lastone==="."){
                    store.totalPrice = totalPrice.substring(0, totalPrice.length-1) + "+";
                }
                // +在末尾 不再+
                else if(lastone==="+"){
                    return;
                }
                // +不在末尾 但是包含+ 计算值(+) 再加上+号
                else if(totalPrice.includes("+")){
                    const [num1, num2] = totalPrice.split("+");
                    store.totalPrice = Number(num1) + Number(num2) + "+";
                }
                // -在末尾 替换成+
                else if(lastone==="-"){
                    store.totalPrice = _.replace(store.totalPrice, "-", "+");
                }
                // -不在末尾 但是开头是- 说明第一个数是负数 计算值(-)
                else if(firstone==="-"){
                    const [num0, num1, num2] = totalPrice.split("-");
                    if(num2) {
                        store.totalPrice = - Number(num1) - Number(num2) + "+";
                    } else {
                        store.totalPrice += key;
                    }
                }
                // -不在开头 但是包含- 计算值(-)
                else if(totalPrice.includes("-")){
                    const [num1, num2] = totalPrice.split("-");
                    store.totalPrice = Number(num1) - Number(num2) + "+";
                }
                else {
                    store.totalPrice += key;
                }
                break;
            case "-":
                if(lastone==="."){
                    store.totalPrice = totalPrice.substring(0, totalPrice.length-1) + "-";
                }
                // -在末尾 不再-
                else if(lastone==="-"){
                    return;
                }
                // -不在末尾 但是开头是- 说明第一个数是负数 计算值(-)
                else if(firstone==="-"){
                    const [num0, num1, num2] = totalPrice.split("-");
                    if(num2) {
                        store.totalPrice = - Number(num1) - Number(num2) + "-";
                    }else{
                        store.totalPrice += key;
                    }
                }
                // -不在开头 但是包含- 计算值(-)
                else if(totalPrice.includes("-")){
                    const [num1, num2] = totalPrice.split("-");
                    store.totalPrice = Number(num1) - Number(num2) + "-";
                }
                // +在末尾 替换成-
                else if(lastone==="+"){
                    store.totalPrice = _.replace(store.totalPrice, "+", "-");
                }
                // +不在末尾 但是包含+ 计算值(+)
                else if(totalPrice.includes("+")){
                    const [num1, num2] = totalPrice.split("+");
                    store.totalPrice = Number(num1) + Number(num2) + "-";
                }
                else {
                    store.totalPrice += key;
                }
                break;
            default:break;
        }
    };

    backClick = () => {
        // 退格到最后一位 变成0
        const {totalPrice} = store;
        if(totalPrice.length<=1){
            store.totalPrice = "0";
            return;
        }
        store.totalPrice = totalPrice.substring(0, totalPrice.length-1);
    };

    calClick = (e) => {
        const {totalPrice, makeAccount} = store;
        const firstone = totalPrice[0];
        const key = e.target.innerHTML;
        switch (key) {
            case "完成":
                if(["0.00","0.0","0"].includes(totalPrice)){
                    Toast.info("请输入金额!", 1);
                } else {
                    makeAccount();
                }
                break;
            case "=":
                if(totalPrice.includes("+")){
                    const [num1, num2] = totalPrice.split("+");
                    store.totalPrice = Number(num1) + Number(num2) + "";
                }
                else if(firstone==="-"){
                    const [num0, num1, num2] = totalPrice.split("-");
                    store.totalPrice = - Number(num1) - Number(num2) + "";
                }
                else if(totalPrice.includes("-")){
                    const [num1, num2] = totalPrice.split("-");
                    store.totalPrice = Number(num1) - Number(num2) + "";
                }
                break;
        }
    };
}

export default Calculator;
