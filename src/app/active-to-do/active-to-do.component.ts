import {Component, Input, OnInit} from '@angular/core';
import {ActiveToDoService} from '../active-to-do.service';

import {TodoService} from '../todo.service';
import {Todo} from "../models/todo";
import {Tag} from "../models/tag";

@Component({
  selector: 'app-active-to-do',
  templateUrl: './active-to-do.component.html',
  styleUrls: ['./active-to-do.component.css']
})
export class ActiveToDoComponent implements OnInit {
  @Input() selectedTag: Tag | null = null
  newTodoName: string = ""
  editingDescription: string = ""
  editingName: string = ""

  constructor(public activeToDoService: ActiveToDoService, public todoService: TodoService) {
  }

  ngOnInit(): void {
    this.activeToDoService.init()
    this.todoService.init()
  }



  onAccept(todo: Todo) {
    try {
      this.todoService.changeTodo(todo.id,this.editingName, this.editingDescription)
      this.activeToDoService.toggleIsEditing(todo)
    } catch (error: any) {
      const message = error.message ? error.message : error
      alert(message)
      this.editingName = todo.name
    }
  }

  onStartEditing(todo: Todo) {
    this.editingName = todo.name
    this.activeToDoService.toggleIsEditing(todo)
  }
}



