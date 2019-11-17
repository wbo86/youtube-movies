import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  view: boolean = true;

  constructor(private youTubeService: YoutubeService, private router: Router, public storageService: StorageService) { }

  ngOnInit() {
  }

  public watchMovie(id: string) {
    this.router.navigate(['/watch-movie', id]);
  }

  public toggleView() {
    this.view = !this.view;
  }

  public getCurrentPhrase() {
    return this.storageService.getSessionStorageItem('LAST_SEARCHED_ITEM');
  }

}
