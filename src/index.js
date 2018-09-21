import React from 'react';
import ReactDom from 'react-dom';
import history from 'utils/history';
import './index.less';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

import Footer from "./components/footer";
import Detail from "components/detail";
import Chart from "components/chart";
import Discover from "components/discover";
import Mine from "components/mine";
import Accounting from "components/accounting";

ReactDom.render(
    <Router history={history} >
        <div>
            <Switch>
                <Route exact path="/" component={Detail} />
                <Route path="/charts" component={Chart} />
                <Route path="/discover" component={Discover} />
                <Route path="/mine" component={Mine} />
            </Switch>
            <Footer />
            <Accounting />
        </div>
    </Router>,
    document.getElementById('root')
);