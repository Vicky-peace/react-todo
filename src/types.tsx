export type FilterType = 'all' | 'active' | 'completed';

export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_TODO'; payload: number }
    | { type: 'EDIT_TODO'; payload: { id: number; text: string } }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'CLEAR_COMPLETED' }
    | { type: 'SET_FILTER'; payload: FilterType };

export interface AppState {
    todos: Todo[];
    filter: FilterType;
}
