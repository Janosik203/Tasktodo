import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TagList } from '../tag-list';
import { zadList } from '../output-interface'
import { throwIfEmpty, withLatestFrom } from 'rxjs';
import { ActiveToDoService } from '../active-to-do.service';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  @Input() taglista: TagList[]= [];
  @Input() zadlista: zadList[]= [];
  @Output() addNewTag = new EventEmitter<string>();
  @Output() deleteNewTag = new EventEmitter<string>();
  @Output() addNewZad = new EventEmitter<zadList>();
  @Output() doneZad = new EventEmitter<zadList>();
  @Output() description = new EventEmitter<zadList>();
  addTag: boolean = false;
  wpisywanyTag: string ="";
  wpisywanyZad: string ="";
  opis: string = "";
  widthe: number = 0;
  pusto: string = "";
  
  constructor(public activeToDoService: ActiveToDoService, public todoService: TodoService) { }

  ngOnInit(): void {
    this.activeToDoService.init()
    this.todoService.init()
  }
  sendTag(){
    this.addNewTag.emit(this.wpisywanyTag);
  }
  deleteTag(tag: string){
    this.deleteNewTag.emit(tag);
  }
  sendZad(arg: zadList){
    this.addNewZad.emit(arg);
  }
  sendDescription(arg: zadList){
    this.description.emit(arg);
    this.opis = ""
  }
  deleteZad(arg: zadList){
    this.doneZad.emit(arg);
  }
  updateProgressBar(arg: zadList){
    const width = this.zadlista.filter(x=>x.tagName == arg.tagName).length
    const done = this.zadlista.filter(x=>x.tagName == arg.tagName).filter(x=>x.done == true).length
    const x = 100/width
    const a = width - done
    const b = width - a
    this.widthe = b * x
    console.log("width" + this.widthe)
    console.log(x)
    console.log(b)

  }

  calculateProgress(tag: TagList) {
    const width = this.zadlista.filter(x=>x.tagName == tag.name).length
    const done = this.zadlista.filter(x=>x.tagName == tag.name).filter(x=>x.done == true).length
    const x = 100/width
    const a = width - done
    const b = width - a
    // this.widthe = b * x
    // console.log("width" + this.widthe)
    console.log(x)
    console.log(b)
    return done*100/width
  }
}

