import * as React from "react";
import { NavLink } from 'react-router-dom';
import * as styles from './Footer.css';

class Footer extends React.Component {
    public render() {
        return (
            <footer className={styles.footer}>
                <span className={styles.footer_con}>
                    <NavLink to="/" exact activeClassName={'active'}>
                        <img src="/images/tabbar_detail@3x.png" alt="明细"/>
                        <span>明细</span>
                    </NavLink>
                </span>
                <span className={styles.footer_con}>
                    <NavLink to="/charts" exact activeClassName={'active'}>
                        <img src="/images/tabbar_chart@3x.png" alt="图表"/>
                        <span>图表</span>
                    </NavLink>
                </span>
                <span className={styles.footer_con}>
                    <NavLink to="/accounting" exact activeClassName={'active'}>
                        <img src="/images/tabbar_add@3x.png" alt="记账"/>
                        <span>记账</span>
                    </NavLink>
                </span>
                <span className={styles.footer_con}>
                    <NavLink to="/discover" exact activeClassName={'active'}>
                        <img src="/images/tabbar_discover@3x.png" alt="发现"/>
                        <span>发现</span>
                    </NavLink>
                </span>
                <span className={styles.footer_con}>
                    <NavLink to="/profile" exact activeClassName={'active'}>
                        <img src="/images/tabbar_mine@3x.png" alt="我的"/>
                        <span>我的</span>
                    </NavLink>
                </span>
            </footer>
        )
    }
}

export default Footer;