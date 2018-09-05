import * as React from "react";
import * as styles from './Accounting.less';
import * as cx from 'classnames';

class Accounting extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            accountType: "支出",
            showSelector: false
        };
    }

    public render() {
        const { accountType, showSelector } = this.state;
        return (
            <div className={styles.container} id='accounting_container'>
                <div className={cx(styles.header, styles.ignore)}>
                    <span className={styles.selector} onClick={this.onTypeSelect}>
                        {accountType}
                        <img className={cx(styles.arrowDown, styles.ignore)} src="/images/arrow down.png"/>
                    </span>
                    {showSelector ?
                        <div>
                            <div>
                                <img src="/images/tabbar_mine_s@3x.png" alt=""/>
                                <span>支出</span>
                            </div>
                            <div>
                                <img src="/images/tabbar_mine_s@3x.png" alt=""/>
                                <span>收入</span>
                            </div>
                        </div>: null
                    }
                    <button onClick={this.closeAccount} className={styles.btnCancel}>取消</button>
                </div>
            </div>
        )
    }

    closeAccount=()=>{
        const elem:any = document.getElementById('accounting_container');
        elem.style.display = "none";
    };

    onTypeSelect=()=>{
        const showSelector = !this.state.showSelector;
        this.setState({
            showSelector
        })
    }
}

export default Accounting;