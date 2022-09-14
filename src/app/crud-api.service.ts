import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrudApiService {
  private url: string = "https://console.firebase.google.com/u/0/project/janosik-8f2e0/storage/janosik-8f2e0.appspot.com/files/~2Ftodoes"

  constructor(private httpClient: HttpClient) {
  }

  create<T>(resourceName: string, resource: T): Observable<T> {
    return this.httpClient.post<T>(`${this.url}/${resourceName}`, resource)
  }

  getAll<T>(resourceName: string): Observable<T[]> {
    return this.httpClient.get<T[]>(`${this.url}/${resourceName}`)
  }
}
