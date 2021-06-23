import { Injectable } from '@angular/core';
import { IAuthor } from '../interfaces/author';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  constructor(private http: HttpClient) {}
  link = 'http://localhost:4000/';
  get(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.link}/authors`);
  }

  getconsole(id: number): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.link}/authors/${id}`);
  }
  create(book): Observable<IAuthor[]> {
    return this.http.post<IAuthor[]>(`${this.link}/authors`, book);
  }
  delete(id: number): Observable<IAuthor[]> {
    return this.http.delete<IAuthor[]>(`${this.link}/authors/${id}`);
  }
}
