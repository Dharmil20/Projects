import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { useState, useEffect } from 'react';

function App() { //Function name always capitalized
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({ todos: newList}))
  }

  function handleAddTodo(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function deleteTodo(key){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== key
    })
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(key){
    const valueToBeEdited = todos[key];
    setTodoValue(valueToBeEdited);
    deleteTodo(key);
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, [])

  return (
    <>
      < TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodo={handleAddTodo}/>
      < TodoList handleEditTodo={handleEditTodo} deleteTodo={deleteTodo} todos={todos}/>

      {/* It returns JSx; JS is run inside curly braces just like this comment */}
    </>
  )
}

export default App
