import * as React from 'react'
import Footer from './Footer'
import AddTodo from '../../containers/AddTodo'
import VisibleTodoList from '../../containers/VisibleTodoList'
import * as styles from './App.css';

const App = () => (
    <div className={styles.box}>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)
export default App