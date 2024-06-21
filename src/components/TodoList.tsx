import {Todo} from "../types";
import './todolist.css';

interface TodoListProps{
    todos: Todo[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({todos, onDelete, onEdit}) => {
    return(
        <div className="todoList">
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
                        <label>
                            <input
                             type="checkbox"
                             checked ={todo.isCompleted} /> 
                        </label>
                        {todo.text}
                        <button onClick={() => onEdit(todo.id)}>Edit</button>
                        <button onClick={() => onDelete(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className="bottom-list">
                <span>5 items left</span>
                <span>All</span>
                <span>Active</span>
                <span>Completed</span>
                <span>Clear Completed</span>
            </div>
        </div>
    )
}

export default TodoList;