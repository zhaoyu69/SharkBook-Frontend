import React from 'react';
import {observer} from "mobx-react";
import {Flex, List, Switch} from 'antd-mobile';
import styles from './index.less';
import {globalStore} from "stores/GlobalStore";
import Footer from "components/footer";
import {goto} from "utils/go";
import './index.module.less';

@observer
class Mine extends React.Component {
    render() {
        const {isLogin, user} = globalStore;
        const avatar = isLogin?"/static/images/default_avatar.png":"/static/images/nologin_header@3x.png";
        const username = isLogin?user.get("nickname"):"未登录";
        const avatarClick = ()=>goto(isLogin?"/mine/userInfos":"/login/wechat");

        return (
            <div className={cx(styles.container, "mine-container")}>
                <header>
                    <div className={styles.punch}>
                        <img src="/static/images/upgrade_calendar@3x.png" alt=""/>
                        <span>打卡</span>
                    </div>
                    <dl className={styles.user} onClick={avatarClick}>
                        <dt><img src={avatar} alt=""/></dt>
                        <dd>{username}</dd>
                    </dl>
                    <Flex className={styles.overview}>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>已连续打卡</p>
                        </Flex.Item>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>记账总天数</p>
                        </Flex.Item>
                        <Flex.Item>
                            <p className={styles.o_number}>-</p>
                            <p>记账总笔数</p>
                        </Flex.Item>
                    </Flex>
                </header>
                <div className={styles.main}>
                    <List className={styles.list}>
                        <List.Item
                            thumb={<img src="/static/images/mine_upgrade@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.upgradeClick}
                        >
                            升级为VIP
                        </List.Item>
                    </List>
                    <List className={styles.list}>
                        <List.Item
                            thumb={<img src="/static/images/mine_badge@3x.png" alt=""/>}
                            arrow="horizontal"
                            extra={<span>已获得{0}枚</span>}
                            onClick={this.badgeClick}
                        >
                            徽章
                        </List.Item>
                    </List>
                    <List className={styles.list}>
                        <List.Item
                            thumb={<img src="/static/images/mine_tallytype@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.tallytypeClick}
                        >
                            类别设置
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_remind@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.remindClick}
                        >
                            定时提醒
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_sound@3x.png" alt=""/>}
                            extra={<Switch/>}
                            onClick={this.soundClick}
                        >
                            声音开关
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_detail@3x.png" alt=""/>}
                            extra={<Switch/>}
                            onClick={this.detailClick}
                        >
                            明细详情
                        </List.Item>
                    </List>
                    <List className={styles.list}>
                        <List.Item
                            thumb={<img src="/static/images/mine_share@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.shareClick}
                        >
                            邀请好友&nbsp;<img src="/static/images/mine_award@3x.png" alt=""/>
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_rating@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.ratingClick}
                        >
                            去App Store给鲨鱼记账评分
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_feedback@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.feedbackClick}
                        >
                            意见反馈
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_help@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.helpClick}
                        >
                            帮助
                        </List.Item>
                        <List.Item
                            thumb={<img src="/static/images/mine_about@3x.png" alt=""/>}
                            arrow="horizontal"
                            onClick={this.aboutClick}
                        >
                            关于鲨鱼记账 {"V2.1"}
                        </List.Item>
                    </List>
                </div>
                <Footer />
            </div>
        );
    }

    upgradeClick=()=>{
        console.log("upgradeClick");
    };

    badgeClick=()=>{
        console.log("badgeClick");
    };

    tallytypeClick=()=>{
        console.log("tallytypeClick");
    };

    remindClick=()=>{
        console.log("remindClick");
    };

    soundClick=()=>{
        console.log("soundClick");
    };

    detailClick=()=>{
        console.log("detailClick");
    };

    shareClick=()=>{
        console.log("shareClick");
    };

    ratingClick=()=>{
        console.log("ratingClick");
    };

    feedbackClick=()=>{
        console.log("feedbackClick");
    };

    helpClick=()=>{
        console.log("helpClick");
    };

    aboutClick=()=>{
        console.log("aboutClick");
    };
}

export default Mine;
