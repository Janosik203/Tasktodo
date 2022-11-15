import {Injectable} from '@angular/core';
import {CrudApiService} from "./crud-api.service";
import {CreateTodoDto, Todo} from "./models/todo";
import {FirebaseProviderService} from "./firebase-provider.service";
import * as firestore from "firebase/firestore"
import {Firestore} from "firebase/firestore"

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private readonly collectionName = 'todos'
  private readonly db: Firestore;


  constructor(private crudApiService: CrudApiService, private firebase: FirebaseProviderService) {
    this.db = firebase.getDb()
  }

  async create(todo: CreateTodoDto) {
    return firestore.addDoc(this.getCollection(), todo)
  }

  async getAll() {
    const results = await firestore.getDocs(firestore.query(this.getCollection()))
    return results.docs.map(document => {
      const todo = document.data() as Todo
      todo._id = document.id
      return todo
    })
  }



  private getCollection() {
    return firestore.collection(this.db, this.collectionName)
  }

  async update(todo: Todo) {
    const todoRef = firestore.doc(this.db, this.collectionName, todo._id)
    return firestore.updateDoc(todoRef, todo)
  }

}
