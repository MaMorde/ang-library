import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {
    this.getBooks();
  }

  getBooks() {
    return this.http.get<IBook[]>('http://localhost:4000/books');
  }
  addBook(book) {
    return this.http.post<IBook[]>('http://localhost:4000/books', book);
  }
}
