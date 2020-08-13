import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  books: any;
  constructor(private http: HttpClient) {
    this.getBooks();
  }

  getBooks() {
    return this.http.get('http://localhost:4000/books');
  }
  addBook(book) {
    return this.http.post('http://localhost:4000/books', book);
  }
}
