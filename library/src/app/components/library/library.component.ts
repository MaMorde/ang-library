import { Component, OnInit } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { IBook } from 'src/app/interfaces/book';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AuthorsService } from 'src/app/services/authors.service';
import { IAuthor } from 'src/app/interfaces/author';
import { Observable } from 'rxjs';
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
    this.dialog.open(ModalComponent);
  }

  public delBook(id: number) {
    this.booksService.delete(id).subscribe();
  }
  console(id: number) {
    this.booksService.getconsole(id).subscribe((data) => console.log(data));
  }
}
