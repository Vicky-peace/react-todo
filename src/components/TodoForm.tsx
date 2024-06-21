import React, { useState } from 'react';
import { Action } from '../types';
import './todoform.scss';

interface TodoFormProps {
    dispatch: React.Dispatch<Action>;
}

function TodoForm({ dispatch }: TodoFormProps) {
    const [input, setInput] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input.trim()) return;
        dispatch({ type: 'ADD_TODO', payload: input });
        setInput('');
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                className="todo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Create a new todo..."
            />
        </form>
    );
}

export default TodoForm;
