import React from 'react';
import ReactDom from 'react-dom';
import history from 'utils/history';
import './index.less';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

import Detail from "components/detail";
import Chart from "components/chart";
import Discover from "components/discover";
import Mine from "components/mine";
import Accounting from "components/accounting";
import WechatLogin from "components/login/Wechat";
import PhoneLogin from "components/login/Phone";
import Register from "components/register";

// Parse init
Parse.initialize("APPLICATION_ID");
const serverHost=location.host.split(':')[0];
Parse.serverURL='http://' + serverHost + ':1338/parse';

ReactDom.render(
    <Router history={history} >
        <div>
            <Switch>
                <Route exact path="/" component={Detail} />
                <Route path="/charts" component={Chart} />
                <Route path="/discover" component={Discover} />
                <Route path="/mine" component={Mine} />
                <Route path="/login/wechat" component={WechatLogin}/>
                <Route path="/login/phone" component={PhoneLogin}/>
                <Route path="/register" component={Register}/>
            </Switch>
            <Accounting />
        </div>
    </Router>,
    document.getElementById('root')
);