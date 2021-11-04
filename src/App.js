import React, {useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from 'react-draggable'
import './App.css'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const newTodo = () => {
    if(todo.trim() !== '') {
      const newTodo = {
        id: uuidv4(),
        todo,
        color: randomColor({
          luminosity: 'light',
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setTodos((todos) => [...todos, newTodo])
      setTodo('')
    } else {
      alert('Enter value')
      setTodo('')
    }
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
      todo.completed = !todo.completed
    }
    return todo}))
  }

  const updatePosition = (data, index) => {
    let newArr = [...todos]
    newArr[index].defaultPos = {x: data.x, y: data.y}
    setTodos(newArr)
  }

  const pressEnter = (e) => {
    if(e.which === 13) {
      newTodo()
    }
  }

  return (
    <div className='App'>
      <div className='wrapper'>
        <input onChange={(e) => setTodo(e.target.value)} onKeyPress={(e) => pressEnter(e)} value={todo} type='text' placeholder='Create todo'></input>
        <button onClick={newTodo} className='create'>Create</button>
      </div>

      {todos.map((todo, index) => {
        return (
          <Draggable
            key={index}
            defaultPosition={todo.defaultPos}
            onStop={(e, data) => {
              updatePosition(data, index)
            }}
          >
            <div className={todo.completed ? 'complete' : 'todo__item'} style={{backgroundColor: todo.color}}>
              {`${todo.todo}`}
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className={'todoCheck'}
              />
              <button onClick={() => deleteTodo(todo.id)} className='delete'>X</button>
            </div>
          </Draggable>
        )
      })}
    </div>
  );
}

export default App;
