import React, { useState } from 'react';
import { States } from '../types/States';
import { TodoItem } from '../types/TodoItem.model';
import { Chip, Typography } from '@mui/material';

interface TodoContainerProps {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}
export default function TodoContainer({
  todoList,
  setTodoList,
}: TodoContainerProps) {
  const sections: States[] = [States.toDo, States.onGoing, States.done];
  function dragStart(event: React.DragEvent, id: string) {
    const li = document.getElementById(id);
    li?.classList.add('hide');
    li?.classList.add('dragging');
    event.dataTransfer.setData('text', event.currentTarget.id);
  }

  function dragEnd(event: React.DragEvent, id: string) {
    const li = document.getElementById(id);
    li?.classList.remove('hide');
    li?.classList.remove('dragging');
  }

  function addZone(event: React.DragEvent, id: string) {
    event.preventDefault();
    const ul = document.getElementById(id);
    ul?.classList.add('drag-over');
  }
  function removeZone(event: React.DragEvent, id: string) {
    event.preventDefault();
    const ul = document.getElementById(id);
    ul?.classList.remove('drag-over');
  }
  function onDropItem(event: React.DragEvent, id: string) {
    event.preventDefault();
    const idLi = event.dataTransfer.getData('text');
    const item = todoList.find((todo: TodoItem) => todo.id === idLi);
    item?.moveTodo(id);
    const newList = [...todoList];
    setTodoList(newList);

    const ul = document.getElementById(id);
    ul?.classList.remove('drag-over');
  }

  return (
    <section className='todo-container'>
      {sections.map((state) => (
        <div key={state}>
          <Typography className='todo-container-title' variant='h2'>
            {state}
          </Typography>
          <ul
            id={state}
            onDragEnter={(e) => addZone(e, state)}
            onDragOver={(e) => addZone(e, state)}
            onDragLeave={(e) => removeZone(e, state)}
            onDrop={(e) => onDropItem(e, state)}
          >
            {todoList
              .filter((todo) => todo.state === state)
              .map((todo: TodoItem) => (
                <li
                  key={todo.id}
                  draggable
                  onDragStart={(e: React.DragEvent) => dragStart(e, todo.id)}
                  onDragEnd={(e: React.DragEvent) => dragEnd(e, todo.id)}
                  id={todo.id}
                >
                  {todo.title}
                  <Chip
                    label={todo.state}
                    color={
                      todo.state === States.toDo
                        ? 'error'
                        : todo.state === States.onGoing
                        ? 'warning'
                        : 'success'
                    }
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
