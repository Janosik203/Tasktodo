import { Injectable } from '@angular/core';
import { TodoService } from './todo.service';
import { zadList } from './output-interface'
import { findIndex } from 'rxjs';
import { TagList } from './tag-list';


@Injectable({
  providedIn: 'root'
})
export class ActiveToDoService {
  activeElement: TagList 
  newTag: string= ""
  aktywowany: boolean = true
  activedescription: boolean = true
  
  newDescription: string=""
  init() {
 
  }
  
 
  constructor(public todoService: TodoService) {
    this.todoService.init()
    this.activeElement ={
      name: "",
      id: 0
    }
  }
  aktywacja(){
    if(this.aktywowany === true){
      this.aktywowany = false;
    }else{
      this.aktywowany=true
    }
  }
  aktywacjaopis(zad: zadList){
    if(zad.aktywacja === true){
      zad.aktywacja = false
    }else{
      zad.aktywacja = true;
    }
  }
  activeFocus(name : string){
    // Łapanie focusu na elemencie
    var aktywnyElement = this.todoService.tagList.findIndex(x=>x.name == name);
    this.activeElement = this.todoService.tagList[aktywnyElement];
  }

}
