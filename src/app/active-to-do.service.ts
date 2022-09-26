import {Injectable} from '@angular/core'
import {Todo} from './models/todo'


@Injectable({
  providedIn: 'root'
})
export class ActiveToDoService {
  newTagName: string = ""
  isEditing: boolean = false

  toggleActive() {
    this.isEditing = !this.isEditing
  }

  toggleIsEditing(zad: Todo) {
    zad.isEditing = !zad.isEditing
  }

}
