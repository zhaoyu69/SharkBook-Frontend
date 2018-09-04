import * as React from "react";
import * as styles from './Accounting.css';

class Accounting extends React.Component {
    public render() {
        return (
            <div className={styles.container} id='accounting_container'>
                <button onClick={this.closeAccount}>取消</button>
            </div>
        )
    }

    closeAccount=()=>{
        const elem:any = document.getElementById('accounting_container');
        elem.style.display = "none";
    }
}

export default Accounting;