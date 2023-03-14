import { States } from './States';

export class TodoItem {
  id: string;
  title: string;
  state?: States = States.toDo;
  constructor(id: string, title: string, state?: States) {
    this.id = id;
    this.title = title;
    if (state) {
      this.state = state;
    }
  }

  editTodo(newText: string) {
    this.title = newText;
  }

  moveTodo(newStatus: string) {
    if (newStatus === States.onGoing) {
      this.state = States.onGoing;
    } else if (newStatus === States.done) {
      this.state = States.done;
    } else {
      this.state = States.toDo;
    }
  }
}
