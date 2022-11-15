import {Injectable} from '@angular/core';
import {Tag} from './models/tag';
import {Todo} from './models/todo';
import {TodoApiService} from "./todo-api.service";
import {uniq} from "lodash"
import {ModalserviceService} from "./modalservice.service";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  tags: Tag[] = [];
  todos: Todo[] = [];
  nextTagId: number = 0;
  nextTodoId: number = 0;
  loadingicon: boolean = false;
  todosOf12345: Todo[] = []
  changeTag: string = ""


  constructor(private todoApiService: TodoApiService, private modalService: ModalserviceService) {

  }

  async init() {
    // const tagsJson = localStorage.getItem("tags");
    // if (tagsJson) {
    //   this.tags = JSON.parse(tagsJson);
    //   this.nextTagId = 1 + this.tags.reduce((accumulator, currentValue) => currentValue.id > accumulator ? currentValue.id : accumulator, 0);
    // }
    this.todos = await this.todoApiService.getAll()
    this.tags = uniq(this.todos.map(todo => todo.tagName)).map(tagName => ({name: tagName, id: 0} as Tag))
  }

  async changeTodo(id: string | null | undefined, name: string, description: string) {
    if (name === "") {
      throw new Error("Nazwa zadania jest pusta")
    }
    const todo = this.todos.find(todo => todo._id === id)
    if (!todo) {
      throw new Error(`Todo ${id} nie istnieje`)
    }
    todo.name = name
    todo.description = description
    await this.todoApiService.update({...todo, name, description})
    // .subscribe(this.todoApiService.update => {
    //   find index by id
    //   replace
    // })

    this.todos = await this.todoApiService.getAll()
  }

  async changeTagName(newTag: Tag) {
    console.log(newTag.id)
    if(newTag.name != ""){
      const tag = this.tags.find(tag => tag.id === newTag.id)
      if (!tag) {
        throw new Error(`Tag ${newTag.id} nie istnieje`)
      }

      const todosOfCurrentTag = this.todos.filter(x => x.tagName == tag.name)
      tag.name = newTag.name
      for (let todo of todosOfCurrentTag) {
        todo.tagName = tag.name;
        await this.todoApiService.update(todo)
      }
      this.todos = await this.todoApiService.getAll()

    }else{
      alert("Tag can't be empty")
    }
  }

  addTag(name: string) {
    if(name != ""){
      if (this.tags.some(tag => tag.name === name)) {
        throw new Error("Tag exists")
      }
      this.tags.push({id: this.nextTagId, name})
      this.nextTagId++;
    }else{
      alert("Tag can't be empty")
    }

    // this.saveTags();
  }

  // deleteTag(name: string) {
  //   const index = this.tags.findIndex(x => x.name === name);
  //   this.tags.splice(index, 1)
  //   this.saveTags();
  // }

  async addTodo(tagName: string, name: string) {
    // Próba 1
    if(name != ""){
      this.loadingicon = true;

      await this.todoApiService.create({
        //id: this.nextTodoId, // DO usuniecia
        tagName: tagName,
        name: name,
        description: "Description",
        isDone: false,
        //isEditing: false
      })

      this.todos = await this.todoApiService.getAll()
      this.loadingicon = false;
    }else{
      alert("Task can't be empty")
    }

  }

  async finishTodo(todo: Todo) {
    todo.isDone = true;
    await this.todoApiService.update(todo)
    this.todos = await this.todoApiService.getAll()

  }

  countActiveTodosByTagName(tagName?: string) {
    return this.todos.filter(x => x.tagName === tagName && !x.isDone).length
  }

  // private saveTodos() {
  //   localStorage.setItem('todos', JSON.stringify(this.todos));
  // }
  //
  // private saveTags() {
  //   localStorage.setItem('tags', JSON.stringify(this.tags));
  // }

  async delete(tag: string) {
    try {
      await this.modalService.ask()
      this.modalService.checkActive()
      const todo = this.todos.filter(x => x.tagName === tag)
      for (let i = 0; i < todo.length; i++) {
        todo[i].tagName = "default"
        await this.todoApiService.update(todo[i])
      }
      this.todos = await this.todoApiService.getAll()
      this.tags = uniq(this.todos.map(todo => todo.tagName)).map(tagName => ({name: tagName, id: 0} as Tag))
    } catch (e) {
      console.warn("User clicked NIE")
    }
  }
  async changeTaskTag(tag: Todo , newTag: string | undefined){
    const todo = this.todos.filter(x => x.tagName === tag.tagName)
    const taskId = todo.findIndex(x => x.name === tag.name)
    todo[taskId].tagName = newTag
    await this.todoApiService.update(todo[taskId])
    this.todos = await this.todoApiService.getAll()
    this.tags = uniq(this.todos.map(todo => todo.tagName)).map(tagName => ({name: tagName, id: 0} as Tag))
  }
}
