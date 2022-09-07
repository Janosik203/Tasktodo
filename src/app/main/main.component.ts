import { Component, OnInit, Input, Output } from '@angular/core';
import { findIndex } from 'rxjs';
import { TodoService } from '../todo.service';
import { ActiveToDoService } from '../active-to-do.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(public todoService: TodoService, public activeToDoService: ActiveToDoService) { }

  ngOnInit(): void {
    this.todoService.init()
    this.activeToDoService.init()
  }
}
