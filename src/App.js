import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import TodoCreator from './components/TodoCreator'
import Todo from './components/Todo'
import './App.css'

function App() {

  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  

  const todoText = todos.filter(item => item.todo).map((item) => item.todo)
  let size = 1
  let subarray = []
  
  for (let i = 0; i <Math.ceil(todoText.length/size); i++){
    subarray[i] = todoText.slice((i*size), (i*size) + size)
  }
 
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const newTodo = () => {
    if(todo.trim() !== '' && !subarray.flat().map(item => item).toString().includes(todo)) {
      const newTodo = {
        id: uuidv4(),
        todo,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 589,
          y: -210
        }
      }
  
      setTodos((todos) => [...todos, newTodo])
      setTodo('')
    } else {
      alert('Enter or change a value')
      setTodo('')
    }
  }

  const pressEnter = (e) => {
    if(e.which === 13) {
      newTodo()
    }
  }

  return (
    <div className='App'>
      <TodoCreator 
        todo={todo} 
        newTodo={newTodo}
        setTodo={setTodo}
        pressEnter={pressEnter}
      />
      <Todo 
        todos={todos} 
        setTodos={setTodos} 
      />
      
    </div>
  );
}

export default App;
