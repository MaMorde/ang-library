import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBook } from '../interfaces/book';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}
  link = 'http://localhost:4000/';
  get(): Observable<IBook[]> {
    return this.http.get<IBook[]>(`${this.link}/books`);
  }
  create(book): Observable<IBook[]> {
    return this.http.post<IBook[]>(`${this.link}/books`, book);
  }
  delete(id: number): Observable<IBook> {
    return this.http.delete<IBook>(`${this.link}/books/${id}`);
  }
}
