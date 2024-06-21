import {Todo} from "../types";

interface TodoListProps{
    todos: Todo[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({todos, onDelete, onEdit}) => {
    return(
        <ul>
            {todos.map(todo => (
                <li key= {todo.id}>
                    <span>{todo.text}</span>
                    <button onClick={() => onEdit(todo.id)}>Edit</button>
                    <button onClick={() => onDelete(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}

export default TodoList;