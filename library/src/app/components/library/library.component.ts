import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBook } from 'src/app/interfaces/book';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { ModalBooksComponent } from 'src/app/modals/modal-books/modal-books.component';
import { IAuthor } from 'src/app/interfaces/author';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  constructor(private booksService: BooksService, public dialog: MatDialog) {}
  public books: Observable<IBook[]>;
  public authors: IAuthor[] = [
    { id: 1, name: 'name', surname: 'surname' },
    { id: 1, name: 'danm', surname: 'damnov' },
    { id: 1, name: 'George', surname: 'Orwell' },
  ];
  displayedColumns: string[] = [
    'id',
    'title',
    'genre',
    'author',
    'edit',
    'delete',
  ];

  ngOnInit(): void {
    this.books = this.booksService.get();
  }
  openCreateForm() {
    const dialogRef = this.dialog.open(ModalBooksComponent);

    dialogRef
      .afterClosed()
      .subscribe((data) => (this.books = this.booksService.create(data)));
  }

  public delBook(id: number) {
    this.books = this.booksService.delete(id);
  }
  console(id: number) {
    this.booksService.getconsole(id).subscribe((data) => console.log(data));
  }
}
