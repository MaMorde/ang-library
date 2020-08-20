import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IBook } from 'src/app/interfaces/book';
import { BooksService } from 'src/app/services/books.service';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private booksService: BooksService,
    private authorsService: AuthorsService
  ) {}
  public authors: Observable<IAuthor[]>;
  public addBookForm: FormGroup;
  ngOnInit(): void {
    this.authors = this.authorsService.get();
    this.addBookForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      author: ['', [Validators.required]],
    });
  }

  addBook() {
    const { name, genre, author } = this.addBookForm.value;
    const params = { name, genre, author };
    this.booksService.create(params).subscribe((data) => console.log(data));
  }
  public onSubmit() {
    this.addBook();
  }
}
