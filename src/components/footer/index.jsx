import React from "react";
import {observer} from "mobx-react";
import { Link } from 'react-router-dom';
import styles from './index.css';
import routes from './routes';
import {globalStore} from "stores/GlobalStore";

@observer
class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.footer}>
                {routes.map((route, idx) => {
                    return (
                        <span className={styles.footer_con} key={idx}>
                            {idx === 2?
                                <div onClick={globalStore.showAccounting}>
                                    <img src={route.src} alt={route.title}/>
                                    <span>{route.title}</span>
                                </div>:
                                <Link to={route.url} exact activeClassName="active">
                                    <img src={route.src} alt={route.title}/>
                                    <span>{route.title}</span>
                                </Link>
                            }
                        </span>
                    )
                })}
            </footer>
        )
    }
}

export default Footer;