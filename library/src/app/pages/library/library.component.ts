import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBook } from 'src/app/interfaces/book';
import { switchMap, filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ModalBooksComponent } from 'src/app/modals/modal-books/modal-books.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ModalEditBookComponent } from 'src/app/modals/modal-edit-book/modal-edit-book.component';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit, OnDestroy {
  constructor(private booksService: BooksService, public dialog: MatDialog) {}
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
  ngOnDestroy() {}
  openCreateForm() {
    const dialogRef = this.dialog.open(ModalBooksComponent);

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((data) => !!data),
        switchMap((data) => this.booksService.create(data))
      )
      .subscribe(() => (this.books = this.booksService.get()));
  }

  public delBook(id: number) {
    this.books = this.booksService.delete(id);
  }
  onEdit(id: number) {
    const dialogRef = this.dialog.open(ModalEditBookComponent);

    dialogRef
      .afterClosed()
      .pipe(
        untilDestroyed(this),
        filter((data) => !!data),
        switchMap((data) => this.booksService.put(data))
      )
      .subscribe();
  }
}
