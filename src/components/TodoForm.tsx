import {useState} from 'react';
import { Todo } from '../types';
import './todoform.css';
interface TodoFormProps{
    onSave: (todo: Todo) => void;
    todoToEdit?: Todo | null;
}


const TodoForm: React.FC <TodoFormProps> = ({onSave, todoToEdit}) => {
    const [text, setText] = useState(todoToEdit ? todoToEdit.text : '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!text.trim()) return;

        onSave({id: todoToEdit ? todoToEdit.id : Date.now(), text, completed: false});
        setText('');
    };


    return(
        <div className="form">
           
              <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Add todo...'/>
            <button type="submit">Save</button> 
        </form>
       
        </div>
      
    )
}

export default TodoForm;