import * as React from 'react';
import * as ReactDom from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import history from './helpers/history';
import {Router, Route, Switch, Link} from 'react-router-dom';
import Hello from "./components/Hello";
import App from "./components/todolist/App";

import {createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from './reducers'
import Footer from "./components/footer/Footer";
const store = createStore(rootReducer);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Switch>
                    <Route exact path="/" component={Hello}/>
                    <Route path="/todo" component={App} />
                </Switch>
                <Footer />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
