import { useReducer, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Footer from './components/Footer';
import Header from './components/Header';
import { Action, AppState} from './types';
import './App.scss';

const initialState: AppState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'),
    filter: 'all'
};

const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
            };
        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo)
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };
        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { todos, filter } = state;

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="app">
            <Header />
            <TodoForm dispatch={dispatch} />
            <TodoList todos={filteredTodos} dispatch={dispatch} />
            <Footer todos={todos} dispatch={dispatch} />
        </div>
    );
}

export default App;
