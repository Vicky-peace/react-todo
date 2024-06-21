import { useState, useReducer } from 'react'
import { Todo } from './types'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import './App.css'

type ActionType = 
|{type: 'ADD_TODO'; payload: Todo}
|{type: 'DELETE_TODO'; payload: number}
|{type: 'EDIT_TODO'; payload: Todo}


const reducer = (state: Todo[], action: ActionType): Todo[] => {
  switch(action.type){
    case 'ADD_TODO':
    return [...state, action.payload];
    case 'DELETE_TODO':  
    return state.filter(todo => todo.id !== action.payload);
    case 'EDIT_TODO':
    return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
    default:
      return state;
  }
}

function App() {
const [todos, dispatch] = useReducer(reducer, []);
const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

const handleSaveTodo = (todo: Todo) => {
  if(todoToEdit){
    dispatch({type: 'EDIT_TODO', payload: todo});
    setTodoToEdit(null);
  }else{
    dispatch({type: 'ADD_TODO', payload: todo});
  }
};

const handleDeleteTodo = (id: number) => {
  dispatch({type: 'DELETE_TODO', payload: id});
}

const handleEditTodo = (id: number) => {
  const todo = todos.find(t => t.id === id);
  if(todo){
    setTodoToEdit(todo);
  }
}




  return (
    <div className='container'>
      <h1>Todo App</h1>
      <TodoForm onSave={handleSaveTodo} todoToEdit={todoToEdit} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
    </div>
  )
}

export default App
