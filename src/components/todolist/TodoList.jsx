import { useEffect, useState } from "react";
import './TodoList.css';
import CreateTodo from "../createtodo/CreateTodo";
import TodoItem from "../todoitem/TodoItem";

const TodoList = () => {
    const [todoList, setTodoList] = useState([]);
    const [update, setUpdate] = useState(false);

    const [newTitle, setNewTitle] = useState('');

    const setTitle = (e) => {
        setNewTitle(e.target.value)
    }

    useEffect(()=>{
        fetch('http://localhost:3001/todos')
        .then(res => res.json())
        .then(data => {
            setTodoList(data)
        })
    },[update]);

    const deleteItems = (id) => {
        
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "DELETE", 
        }).then(() => {
            setUpdate(prev => !prev)
        })
        
    }

    const changeItems = (id) => {
        const change = {
            "title": newTitle,
            "complete": todoList.find(todo => todo.id === id)?.complete || false
        }

        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify(change),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setUpdate(prev => !prev)
        })
    }

    const completeItem = (id) => {
        if(todoList.find(todo => todo.id === id)?.complete || false){
            const changeState = {"complete": false};
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify(changeState),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setUpdate(prev => !prev)
        })
        } else {
            const changeState = {"complete": true};
        fetch(`http://localhost:3001/todos/${id}`, {
            method: "PATCH",
            body: JSON.stringify(changeState),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => {
            setUpdate(prev => !prev)
        })
        }
    }

    const render = (todos) => {
        
        if(!todos || !todos.length === 0){
            return <span>Ничего нет</span>
        }
        return(
            <>
                {todos.map((todos, id)=>(
                    <TodoItem 
                        todo={todos} 
                        key={id} 
                        deleteItems={deleteItems} 
                        setTitle={setTitle} 
                        completeItem={completeItem}  
                        changeItems={changeItems}>
                    </TodoItem>
                ))}
            </>
        )
    }

    const completeArr = todoList.filter(todo => todo.complete);
    const processedArr = todoList.filter(todo => !todo.complete);

    const pendingTasks = render(processedArr);
    const completeTasks = render(completeArr);

    return(
        <>
            <p>Create TODO!</p>
            <div className="create">
                <CreateTodo fun={setUpdate} up={update}/>
            </div>
            <div className="task_title">Задачи для выполнения</div>
            <div className="process_list">
                    {pendingTasks}
            </div>
            <div className="complete_title">Выполненые задачи</div>
                <div className="complete_task">
                    {completeTasks}
                </div>
        </>
    )

}


export default TodoList;







// {
//     "todos": [
//       {
//         "id": "8fc1",
//         "title": "Попить чай",
//         "complete": false
//       }
//     ]
//   }