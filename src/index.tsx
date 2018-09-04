import * as React from 'react';
import * as ReactDom from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import history from './helpers/history';
import {Router, Route, Switch} from 'react-router-dom';
import Details from "./components/details/Hello";
import Charts from "./components/charts/Charts";
import Discover from "./components/discover/Discover";
import Profile from "./components/profile/Profile";
import App from "./components/todolist/App";

import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from './reducers'
import Footer from "./components/footer/Footer";
import Accounting from "./components/accounting/Accounting";
const store = createStore(rootReducer);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Switch>
                    <Route exact path="/" component={Details}/>
                    <Route path="/charts" component={Charts}/>
                    <Route path="/discover" component={Discover}/>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/todo" component={App} />
                </Switch>
                <Footer />
                <Accounting />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
