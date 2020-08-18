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
  public books: IBook[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'genre',
    'author',
    'edit',
    'delete',
  ];

  ngOnInit(): void {
    this.data.getBooks().subscribe((data) => console.log(data));

    this.data.getBooks().subscribe((data) => (this.books = data));
  }
  public addBook() {
    const newBook = {
      name: 'title',
      genre: 'sdasd',
      authors: null,
    };
    this.data.addBook(newBook).subscribe((data) => console.log(data));
  }
}
