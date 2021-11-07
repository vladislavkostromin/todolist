import React from 'react'
import Draggable from 'react-draggable'
import styled from 'styled-components'

const Todo = ({todos, setTodos}) => {
    const updatePosition = (data, index) => {
        let newArr = [...todos]
        newArr[index].defaultPos = {x: data.x, y: data.y}
        setTodos(newArr)
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

    return (
        <>
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
                            {todo.todo}
                            <SCheck
                                type='checkbox'
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                className={'todoCheck'}
                            />
                            <SDelete onClick={() => deleteTodo(todo.id)} className='delete'>X</SDelete>
                        </div>
                    </Draggable>
                )
            })}
        </>
    );
};

export default Todo;

const SDelete = styled.button`
    position: absolute;
    right: 1px;
    top: 1px;
    background: none;
    border: none;
    cursor: pointer;
`

const SCheck = styled.input`
    width: 15px;
    height: 15px;
`