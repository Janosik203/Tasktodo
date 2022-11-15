import {Component, Input} from '@angular/core';
import {ActiveToDoService} from '../active-to-do.service';

import {TodoService} from '../todo.service';
import {Todo} from "../models/todo";
import {Tag} from "../models/tag";

import {faEdit, faSpinner} from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-active-to-do',
  templateUrl: './active-to-do.component.html',
  styleUrls: ['./active-to-do.component.css']
})
export class ActiveToDoComponent {
  @Input() selectedTag: Tag | null = null
  newTodoName: string = ""
  editingDescription: string = ""
  editingName: string = ""
  selectTag: string = "defoult"
  faSpinner: any = faSpinner;
  faEdit: any = faEdit;
  optionTag: string = "";

  constructor(public activeToDoService: ActiveToDoService, public todoService: TodoService) {
  }

  onAccept(todo: Todo) {
    try {
      this.activeToDoService.toggleIsEditing(todo)
      this.todoService.changeTodo(todo._id, this.editingName, this.editingDescription)
    } catch (error: any) {
      const message = error.message ? error.message : error
      alert(message)
      this.editingName = todo.name
    }
  }

  onStartEditing(todo: Todo) {
    this.editingName = todo.name
    this.activeToDoService.toggleIsEditing(todo)
    if (this.selectedTag != undefined) {
      this.todoService.changeTag = this.selectedTag?.name;
    }
    if (todo.tagName != undefined) {
      this.optionTag = todo.tagName;
    }
    if (todo.description != undefined) {
      this.editingDescription = todo.description
    } else {
      this.editingDescription = "Description"
    }
  }
}



