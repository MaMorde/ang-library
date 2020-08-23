import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatRadioModule } from '@angular/material/radio';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NavbarComponent } from './components/navbar/navbar.component';
import { LibraryComponent } from './pages/library/library.component';
import { AuthorsComponent } from './pages/authors/authors.component';
import { ModalBooksComponent } from './modals/modal-books/modal-books.component';
import { ModalAuthorsComponent } from './modals/modal-authors/modal-authors.component';

import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';
import { ModalEditBookComponent } from './modals/modal-edit-book/modal-edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LibraryComponent,
    ModalBooksComponent,
    ModalAuthorsComponent,
    AuthorsComponent,
    ModalEditBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [BooksService, AuthorsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
