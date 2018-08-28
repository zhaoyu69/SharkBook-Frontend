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
const store = createStore(rootReducer);

ReactDom.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <ul>
                    <li><Link to="/">Homes</Link></li>
                    <li><Link to="/todo">TodoList</Link></li>
                </ul>
                <Switch>
                    <Route exact path="/" component={Hello}/>
                    <Route path="/todo" component={App} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
