import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorsService } from 'src/app/services/authors.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalBooksComponent } from '../modal-books/modal-books.component';
import { Observable } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';

@Component({
  selector: 'app-modal-authors',
  templateUrl: './modal-authors.component.html',
  styleUrls: ['./modal-authors.component.scss'],
})
export class ModalAuthorsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    public dialogRef: MatDialogRef<ModalBooksComponent>
  ) {}

  public addAuthorForm: FormGroup;

  ngOnInit(): void {
    this.addAuthorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
    });
  }

  closeDialog(params) {
    this.dialogRef.close(params);
  }
  public onSubmit() {
    // tslint:disable-next-line:variable-name
    const { name, surname } = this.addAuthorForm.value;
    const params = { name, surname };
    this.closeDialog(params);
  }
}
