import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './pages/library/library.component';
import { AuthorsComponent } from './pages/authors/authors.component';

const routes: Routes = [
  { path: 'library', component: LibraryComponent },
  {
    path: 'authors',
    component: AuthorsComponent,
  },

  {
    path: '',
    redirectTo: '/library',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
