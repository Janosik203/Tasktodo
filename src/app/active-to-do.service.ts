import {Injectable} from '@angular/core';
import {TodoService} from './todo.service';
import {Todo} from './models/todo'
import {Tag} from './models/tag';


@Injectable({
  providedIn: 'root'
})
export class ActiveToDoService {
  newTagName: string = ""
  isEditing: boolean = false

  constructor(public todoService: TodoService) {
    this.todoService.init()
  }

  init() {

  }

  toggleActive() {
    this.isEditing = !this.isEditing
  }

  toggleIsEditing(zad: Todo) {
    zad.isEditing = !zad.isEditing
  }

}
