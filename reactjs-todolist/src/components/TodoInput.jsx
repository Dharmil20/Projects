import React from 'react'

export default function TodoInput(props) {
    const {setTodoValue, todoValue, handleAddTodo } = props;
    return (
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} placeholder='Enter ToDo......' />
            <button onClick={() => {
                handleAddTodo(todoValue);
                setTodoValue('');
            }}>Add</button>
        </header>
    )
}
