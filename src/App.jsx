import { useEffect, useState } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"


function App() {
 
  const [todos, setTodos] = useState([
    'go to gym',
    'eat more greens'
  ])

  const[todoValue, setTodoValue] = useState('')

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos:newList}))
  }

  function handleAddTodos(newTodo){
    const newTodos = [...todos,newTodo]
    persistData(newTodos)
    setTodos(newTodos)
  }

  function handleDeleteTodo(index){
    const newTodos = todos.filter( (todo, todoIndex)=> {
      return index !== todoIndex
    })
    persistData(newTodos)
    setTodos(newTodos)
  }

  function handleEditTodo(index){
    console.log("edit called")
    const valueTobeEdited = todos[index]
    setTodoValue(valueTobeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return 
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  },
  [])

  return (
    <main>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue}  handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} todos={todos} handleDeleteTodo = {handleDeleteTodo}/>
    </main>
  )
}

export default App
