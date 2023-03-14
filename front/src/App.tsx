import React, { useState } from 'react';
import { TodoItem } from './types/TodoItem.model';
import { Container } from '@mui/material';
import './style/style.css';
import NewTodo from './components/NewTodo';
import TodoContainer from './components/TodoContainer';
function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  function onAddTodo(text: string) {
    const newList: TodoItem[] = [...todoList];
    const newTodo = new TodoItem(Math.random().toString(), text);
    newList.push(newTodo);
    setTodoList(newList);
  }

  return (
    <div className='app'>
      <Container maxWidth='xl'>
        <div className='grid-container'>
          <NewTodo addTodo={onAddTodo} />
          <TodoContainer todoList={todoList} setTodoList={setTodoList} />
        </div>
      </Container>
    </div>
  );
}

export default App;
