import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { IAuthor } from 'src/app/interfaces/author';
import { AuthorsService } from 'src/app/services/authors.service';
import { ModalAuthorsComponent } from 'src/app/modals/modal-authors/modal-authors.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  constructor(
    private authorService: AuthorsService,
    public dialog: MatDialog
  ) {}
  public authors: Observable<IAuthor[]>;

  displayedColumns: string[] = ['id', 'name', 'surname', 'delete'];

  ngOnInit(): void {
    this.authors = this.authorService.get();
  }
  openCreateForm() {
    const dialogRef = this.dialog.open(ModalAuthorsComponent);

    dialogRef
      .afterClosed()
      .pipe(switchMap((data) => this.authorService.create(data)))
      .subscribe(() => (this.authors = this.authorService.get()));
  }

  public delAuthor(id: number) {
    this.authors = this.authorService.delete(id);
  }
  console(id: number) {
    this.authorService.getconsole(id).subscribe((data) => console.log(data));
  }
}
