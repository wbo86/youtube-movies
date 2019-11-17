import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchAndResultsComponent } from './pages/search-and-results/search-and-results.component';
import { WatchMovieComponent } from './pages/watch-movie/watch-movie.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'search-and-results',
    pathMatch: 'full',
  },
  {
    path: 'search-and-results',
    component: SearchAndResultsComponent,
  },
  {
    path: 'watch-movie/:id',
    component: WatchMovieComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
