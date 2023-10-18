import { Component } from '@angular/core';

class Todo {
  constructor(public todo: string, public status: string) {}
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos: Todo[] = [];
  newTodo: string = ''; 
  selectedItem: Todo | null = null; 
  ngOnInit(): void {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON) {
      this.todos = JSON.parse(todosJSON) as Todo[]; 
    }
  }
  saveData(): void {
    const todosJSON = JSON.stringify(this.todos); 
    localStorage.setItem("todos", todosJSON); 
  }


  onSubmit(): void {
    if (this.newTodo.trim() !== '') {
      const newTodo = new Todo(this.newTodo, 'uncheck');
      this.todos.push(newTodo);
      this.newTodo = ''; 
    }
    this.saveData()
    console.log(this.todos)
  }

  handleClick(todo: Todo): void {
    console.log('Clicked todo:', todo);
    todo.status = todo.status === 'checked' ? 'unchecked' : 'checked';
    console.log('Updated status:', todo.status);
    this.saveData()
  }

  handleDelete(todo: Todo): void {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveData()
    }
  }
}
