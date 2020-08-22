import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { genres } from 'src/assets/genres';
import { BooksService } from 'src/app/services/books.service';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal-books.component.html',
  styleUrls: ['./modal-books.component.scss'],
})
export class ModalBooksComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private authorsService: AuthorsService,
    public dialogRef: MatDialogRef<ModalBooksComponent>
  ) {}

  public authors: Observable<IAuthor[]>;
  public addBookForm: FormGroup;
  public genres;

  ngOnInit(): void {
    this.genres = genres;
    this.authors = this.authorsService.get();
    this.addBookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  closeDialog(params) {
    this.dialogRef.close(params);
  }
  public onSubmit() {
    const { name, genre, author: author_id } = this.addBookForm.value;
    const params = { name, genre, author_id };
    this.closeDialog(params);
  }
}
