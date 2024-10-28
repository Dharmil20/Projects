import React from 'react'

export default function TodoCard(props) {
    const {todos, deleteTodo, index, handleEditTodo} = props;

    return (
        <div>
            <li className='todoItem'>
                {props.children}
                <i onClick={()=>{
                    handleEditTodo(index)
                }} className="fa-solid fa-pen-to-square"></i>
                <i onClick={()=>{
                    deleteTodo(index)
                }} className="fa-regular fa-trash-can"></i></li>
        </div>

    )
}
