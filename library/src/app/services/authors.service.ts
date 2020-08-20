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
}
