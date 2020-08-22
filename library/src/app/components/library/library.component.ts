import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBook } from 'src/app/interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';
import { Observable } from 'rxjs';
import { ModalBooksComponent } from 'src/app/modals/modal-books/modal-books.component';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    public dialog: MatDialog
  ) {}
  public books: Observable<IBook[]>;

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
    this.dialog.open(ModalBooksComponent);
  }

  public delBook(id: number) {
    this.books = this.booksService.delete(id);
  }
  console(id: number) {
    this.booksService.getconsole(id).subscribe((data) => console.log(data));
  }
}
