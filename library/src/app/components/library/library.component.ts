import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IBook } from 'src/app/interfaces/book';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  constructor(private data: DataService) {}
  books: any;
  displayedColumns: string[] = ['id', 'title', 'genre', 'author'];

  ngOnInit(): void {
    this.data.getBooks().subscribe((data) => console.log(data));
  }
  public addBook() {
    const newBook = { name: 'title', genre: 'sdasd', author_books: null };
    this.data.addBook(newBook).subscribe((data) => this.books.push(data));
  }
}
