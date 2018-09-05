import * as React from "react";
import * as styles from "./Hello.css";

class Hello extends React.Component {
    public render() {
        return (
            <div className={styles.hello}>
                Hello
            </div>
        )
    }
}

export default Hello;