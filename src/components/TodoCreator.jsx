import React from 'react'
import styled from 'styled-components'

const todoCreate = ({todo, newTodo, pressEnter, setTodo}) => {
    
    return (
        <SWrapper className='wrapper'>
            <SInput onChange={(e) => setTodo(e.target.value)} onKeyPress={(e) => pressEnter(e)} value={todo} type='text' placeholder='Create todo'></SInput>
            <SCreate onClick={newTodo} className='create'>Create</SCreate>
        </SWrapper>
    );
};

export default todoCreate;

const SWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
    background: #222222;
`

const SCreate = styled.button`
    width: 100px;
    height: 30px;
    font-size: 12px;
    background: none;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    color: whitesmoke;
    margin-left: 10px;
    cursor: pointer;
    &:hover {
        background: whitesmoke;
        color: #222222;
        transition: all .2s linear;
    }
`

const SInput = styled.input`
    height: 30px;
    width: 250px;
    border: 1px solid whitesmoke;
    border-radius: 5px;
    background: none;
    color: whitesmoke;
    padding: 0 10px;
    outline: none;
`