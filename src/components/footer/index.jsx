import React from "react";
import {observer} from "mobx-react";
import { NavLink,withRouter } from 'react-router-dom';
import styles from './index.css';
import routes from 'utils/routes';
import {globalStore} from "stores/GlobalStore";

@withRouter
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
                                <NavLink to={route.url} exact activeClassName="active">
                                    <img src={location.hash === "#" + route.url ? route.activeSrc : route.src} alt={route.title}/>
                                    <span>{route.title}</span>
                                </NavLink>
                            }
                        </span>
                    )
                })}
            </footer>
        )
    }
}

export default Footer;