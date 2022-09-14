import {Component, OnInit} from '@angular/core';
import {TodoService} from '../todo.service';
import {ActiveToDoService} from '../active-to-do.service';
import {Tag} from "../models/tag";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  selectedTag: Tag | null = null

  constructor(public todoService: TodoService, public activeToDoService: ActiveToDoService) {
  }

  ngOnInit(): void {
    this.todoService.init()
    this.activeToDoService.init()
    this.selectedTag = this.todoService.tags.length > 0 ? this.todoService.tags[0] : null
  }

  onTagSelected(tag: Tag) {
    this.selectedTag = tag
  }
}
