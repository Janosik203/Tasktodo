import {Injectable} from '@angular/core';
import {Tag} from './models/tag';
import {Todo} from './models/todo';
import {TodoApiService} from "./todo-api.service";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tags: Tag[] = [];
  todos: Todo[] = [];
  nextTagId: number = 0;
  nextTodoId: number = 0;

  constructor(private todoApiService: TodoApiService) {

  }

  init() {
    const tagsJson = localStorage.getItem("tags");
    if (tagsJson) {
      this.tags = JSON.parse(tagsJson);
      this.nextTagId = 1 + this.tags.reduce((accumulator, currentValue) => currentValue.id > accumulator ? currentValue.id : accumulator, 0);
    }
    this.todoApiService.getAll()
      .subscribe(todoList => {
        this.todos = todoList
      })
    // const todosJson = localStorage.getItem("todos");
    // if (todosJson) {
    //   this.todos = JSON.parse(todosJson);
    //   this.nextTodoId = 1 + this.todos.reduce((accumulator, currentValue) => currentValue.id && currentValue.id > accumulator ? currentValue.id : accumulator, 0);
    // }
  }

  changeTodo(id: number | null | undefined, name: string, description: string) {
    if (name === "") {
      throw new Error("Nazwa zadania jest pusta")
    }
    const todo = this.todos.find(todo => todo.id === id)
    if (!todo) {
      throw new Error(`Todo ${id} nie istnieje`)
    }
    todo.name = name
    todo.description = description
    //todoApiService.update({...todo, name, description})
    //   .subscribe(updatedTodo => {
        // find index by id
        // replace
      // })
    this.saveTodos();
  }

  changeTagName(newTag: Tag) {
    const tag = this.tags.find(tag => tag.id === newTag.id)
    if (!tag) {
      throw new Error(`Tag ${newTag.id} nie istnieje`)
    }

    const todosOfCurrentTag = this.todos.filter(x => x.tagName == tag.name)
    tag.name = newTag.name
    for (let todo of todosOfCurrentTag) {
      todo.tagName = newTag.name;
    }
    this.saveTodos();
    this.saveTags();
  }

  addTag(name: string) {
    if (this.tags.some(tag => tag.name === name)) {
      throw new Error("Tag exists")
    }
    this.tags.push({id: this.nextTagId, name})
    this.nextTagId++;
    this.saveTags();
  }

  // deleteTag(name: string) {
  //   const index = this.tags.findIndex(x => x.name === name);
  //   this.tags.splice(index, 1)
  //   this.saveTags();
  // }

  addTodo(tagName: string, name: string) {
    this.todoApiService.create({
      //id: this.nextTodoId, // DO usuniecia
      tagName: tagName,
      name: name,
      description: "",
      isDone: false,
      //isEditing: false
    }).subscribe(receivedTodo => {
        console.log('from api', receivedTodo)
        this.todos.push(receivedTodo)
        this.nextTodoId++;
        this.saveTodos();
      })
  }

  finishTodo(todo: Todo) {
    todo.isDone = true;
    this.saveTodos();
  }

  countActiveTodosByTagName(tagName?: string) {
    return this.todos.filter(x => x.tagName === tagName && !x.isDone).length
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private saveTags() {
    localStorage.setItem('tags', JSON.stringify(this.tags));
  }

}
