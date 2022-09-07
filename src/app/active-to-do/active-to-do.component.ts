import { Component, OnInit } from '@angular/core';
import { ActiveToDoService } from '../active-to-do.service';
import { TagList } from '../tag-list';

import { TodoService } from '../todo.service';

@Component({
  selector: 'app-active-to-do',
  templateUrl: './active-to-do.component.html',
  styleUrls: ['./active-to-do.component.css']
})
export class ActiveToDoComponent implements OnInit {
 

  constructor(public activeToDoService: ActiveToDoService, public todoService: TodoService) { }

  
    ngOnInit(): void {
      this.activeToDoService.init()
      this.todoService.init()
    }
    newZad: string = "Dodaj nowe zadanie"

  }
  


