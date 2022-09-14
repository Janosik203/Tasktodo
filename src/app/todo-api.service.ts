import { Injectable } from '@angular/core';
import {CrudApiService} from "./crud-api.service";
import {CreateTodoDto, Todo} from "./models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private readonly resourceName = 'todos'
  constructor(private crudApiService: CrudApiService) { }


  create(todo: CreateTodoDto) {
    return this.crudApiService.create<Todo>(this.resourceName, todo)
  }

  getAll() {
    return this.crudApiService.getAll<Todo>(this.resourceName)
  }


}
