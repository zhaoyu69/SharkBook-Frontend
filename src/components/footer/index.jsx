import React from "react";
import {observer} from "mobx-react";
import { NavLink } from 'react-router-dom';
import styles from './index.css';
import routes from './routes';

@observer
class Footer extends React.Component {
    render() {
        return (
            <footer className={styles.footer}>
                {routes.map((route, idx) => {
                    return (
                        <span className={styles.footer_con} key={idx}>
                            {idx === 2?
                                <div onClick={this.addAccount}>
                                    <img src={route.src} alt={route.title}/>
                                    <span>{route.title}</span>
                                </div>:
                                <NavLink to={route.url} exact activeClassName={'active'}>
                                    <img src={route.src} alt={route.title}/>
                                    <span>{route.title}</span>
                                </NavLink>
                            }
                        </span>
                    )
                })}
            </footer>
        )
    }

    addAccount=()=>{

    };
}

export default Footer;