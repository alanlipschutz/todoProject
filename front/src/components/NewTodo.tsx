import React, { useState } from 'react';
import { TextField } from '@mui/material';

interface NewTodoProps {
  addTodo: (text: string) => void;
}

const inputStyle = {
  color: 'white',
  fontFamily: 'Satisfy',
  fontSize: 20,
};

export default function NewTodo({ addTodo }: NewTodoProps) {
  const [text, setText] = useState<string>('');

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    setState: Function
  ) {
    setState(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!text) {
      alert('Please, write a todo');
    }
    event.preventDefault();
    addTodo(text);
    setText('');
  }

  return (
    <>
      <header className='head-container'>
        <h1 className='head-title'> Todo List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <TextField
          color='info'
          required
          value={text}
          label='Insert new Todo'
          style={{ width: 400 }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, setText)
          }
          variant='standard'
          inputProps={{ style: inputStyle }}
          InputLabelProps={{ style: inputStyle }}
        />
      </form>
    </>
  );
}
