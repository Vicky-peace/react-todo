import React from 'react';
import { Todo, Action,FilterType } from '../types';

interface FooterProps {
    todos: Todo[];
    dispatch: React.Dispatch<Action>;
}

function Footer({ todos, dispatch }: FooterProps) {
    const itemsLeft = todos.filter(todo => !todo.completed).length;
    const handleClearCompleted = () => dispatch({ type: 'CLEAR_COMPLETED' });
    const setFilter = (filter: FilterType) => dispatch({ type: 'SET_FILTER', payload: filter });

    return (
        <footer>
            <span>{itemsLeft} items left</span>
            <button onClick={() => setFilter('all')}>All</button>
            <button onClick={() => setFilter('active')}>Active</button>
            <button onClick={() => setFilter('completed')}>Completed</button>
            <button onClick={handleClearCompleted}>Clear Completed</button>
        </footer>
    );
}

export default Footer;
