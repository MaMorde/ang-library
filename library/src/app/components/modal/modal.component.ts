import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IBook } from 'src/app/interfaces/book';
import { DataService } from 'src/app/services/data.service';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private data: DataService) {}
  authors: IAuthor[];
  public addBookForm: FormGroup;
  ngOnInit(): void {
    this.data.getAuthors();
    this.addBookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      authors: ['', []],
    });
  }

  addBook(book: IBook) {
    const newBook: IBook = {
      name: book.name,
      genre: book.genre,
      authors: book.authors,
    };
    this.data.addBook(newBook);
  }
  public onSubmit() {
    if (this.addBookForm.invalid) {
      return;
    } else {
      this.addBook(this.addBookForm.value);
    }
  }
}
