import { useState, useReducer, useEffect } from 'react'
import { Todo } from './types'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import './App.css'

 type ActionType = 
|{type: 'ADD_TODO'; payload: Todo}
|{type: 'DELETE_TODO'; payload: number}
|{type: 'EDIT_TODO'; payload: Todo}
|{type: 'TOGGLE_TODO'; payload: number}
|{type: "LOAD_TODOS"; payload: Todo[] }


export const reducer = (state: Todo[], action: ActionType): Todo[] => {
  switch(action.type){
    case 'ADD_TODO':
    return [...state, action.payload];
    case 'DELETE_TODO':  
    return state.filter(todo => todo.id !== action.payload);
    case 'EDIT_TODO':
    return state.map(todo => todo.id === action.payload.id ? action.payload : todo);
    case 'TOGGLE_TODO':
    return state.map(todo => todo.id === action.payload ? {...todo, isCompleted: !todo.isCompleted} : todo);
    case 'LOAD_TODOS':
      return action.payload;
    default:
      return state;
  }
}

function App() {
const [todos, dispatch] = useReducer(reducer, [], () =>{
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];

});
const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);


useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

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
      <h1>Todo</h1>
      <TodoForm onSave={handleSaveTodo} todoToEdit={todoToEdit} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onEdit={handleEditTodo} />
    </div>
  )
}

export default App
