import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IBook } from '../interfaces/book';
import { IAuthor } from '../interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  authors: IAuthor[];

  getBooks() {
    return this.http.get<IBook[]>('http://localhost:4000/books');
  }
  addBook(book) {
    return this.http.post<IBook[]>('http://localhost:4000/books', book);
  }
  delBook(id: number) {
    return this.http.delete<IBook[]>(`http://localhost:4000/books:${id}`);
  }
  getAuthors() {
    return this.http
      .get<IAuthor[]>('http://localhost:4000/authors')
      .subscribe((data) => (this.authors = data));
  }
}
