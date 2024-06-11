import TodoList from '../../todolist/TodoList';
import './MainPage.css';

const MainPage = () => {
    return(
        <div className="mainpage">
            <div className="title">Todo App</div>
            <div className="descr">Create new todo!</div>
            <div className="todos">
                <TodoList/>
            </div>
        </div>
    )
}

export default MainPage;
