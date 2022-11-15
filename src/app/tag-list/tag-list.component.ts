import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../models/tag';

import {Todo} from '../models/todo'
import {ActiveToDoService} from '../active-to-do.service';
import {TodoService} from '../todo.service';
import {ModalserviceService} from "../modalservice.service";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent {
  @Input() tags: Tag[] = [];
  @Output() onTagAdded = new EventEmitter<string>()
  @Output() onTagSelected = new EventEmitter<Tag>()

  isAdding: boolean = false
  editingTagName: string = ""
  option: string = "Tags"
  constructor(public todoService: TodoService, public modalService: ModalserviceService) {
  }

  addTag() {
    this.onTagAdded.emit(this.editingTagName);
  }
}

