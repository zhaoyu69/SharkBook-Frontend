import * as React from "react";
// import * as styles from "./Hello.css";
import * as styles from './index.less';

class Hello extends React.Component {
    public render() {
        return (
            <div className={styles.hello}>
                <a href="">Hello</a>
            </div>
        )
    }
}

export default Hello;