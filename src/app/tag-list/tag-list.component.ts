import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from '../models/tag';
import {Todo} from '../models/todo'
import {ActiveToDoService} from '../active-to-do.service';
import {TodoService} from '../todo.service';

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
  constructor(public todoService: TodoService) {
  }

  addTag() {
    this.onTagAdded.emit(this.editingTagName);
  }
}

