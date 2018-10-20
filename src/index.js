import React from 'react';
import ReactDom from 'react-dom';
import history from 'utils/history';
import './index.module.less';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

import Detail from "components/detail";
import Chart from "components/chart";
import Discover from "components/discover";
import Mine from "components/mine";
import Account from "components/account";
import WechatLogin from "components/login/Wechat";
import PhoneLogin from "components/login/Phone";
import Register from "components/register/index";
import UserInfos from "components/mine/UserInfos";

// Parse init
Parse.initialize("APPLICATION_ID");
const serverHost=location.host.split(':')[0];
Parse.serverURL='http://' + serverHost + ':1338/parse';

ReactDom.render(
    <Router history={history} >
        <div>
            <Switch>
                <Route exact path="/" component={Detail} />
                <Route exact path="/charts" component={Chart} />
                <Route exact path="/discover" component={Discover} />
                <Route exact path="/mine" component={Mine} />
                <Route exact path="/mine/userInfos" component={UserInfos} />
                <Route exact path="/login/wechat" component={WechatLogin}/>
                <Route exact path="/login/phone" component={PhoneLogin}/>
                <Route exact path="/register" component={Register}/>
                <Route path="*" component={Detail}/>
            </Switch>
            <Account />
        </div>
    </Router>,
    document.getElementById('root')
);