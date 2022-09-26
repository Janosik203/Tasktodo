import { TestBed } from '@angular/core/testing';

import { TodoApiService } from './todo-api.service';
import {HttpClientModule} from "@angular/common/http";
import {Todo} from "./models/todo";

describe('TodoApiService', () => {
  let service: TodoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ]
    });
    service = TestBed.inject(TodoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create document in firebase', async () => {

    const response = await service.create( {
      name: "todo name",
      isDone: false,
      tagName: "work"
    })
    expect(response.id).toBeDefined();
  });

  it('should get documents', async () => {
    const response: Todo[] = await service.getAll()
    expect(response.length).toBeGreaterThan(0);
    expect(response[0].name).toBe("todo name")
    expect(response[0]._id).toBe("9bf3eOOdIcSAJnD0OHk2")
  });

  it('should update document', async () => {
    const response: Todo[] = await service.getAll()
    const todo = response[0]
    todo.isDone = true
    await service.update(todo)
    const newResponse: Todo[] = await service.getAll()
    expect(newResponse.length).toBeGreaterThan(0);
    expect(newResponse[0].name).toBe("todo name")
    expect(newResponse[0].isDone).toBe(true)
  });
});
