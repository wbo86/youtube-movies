import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @ViewChild('searchInput', { read: ElementRef, static: true }) searchInput: ElementRef;
  
  showHistory = false;

  constructor(private youTubeService: YoutubeService, private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.initSearchHistory();
    this.initLastSearchResults();
  }

  public search(searchedItem: string) {
    this.youTubeService.resetPaginationTokens();
    if(searchedItem) {
      this.youTubeService.getSearchResults(searchedItem).subscribe();
      this.storageService.addToSearchHistory(searchedItem);
      this.storageService.setSessionStorageItem('LAST_SEARCHED_ITEM', searchedItem);
    } else {
      this.youTubeService.moviesList.length = 0;
    }
  }

  public searchFromHistory(searchedItem: string) {
    this.search(searchedItem);
    this.showHistory = false;
    this.searchInput.nativeElement.value = searchedItem;
  }

  public clear() {
    this.searchInput.nativeElement.value = null;
    this.youTubeService.moviesList.length = 0;
    this.youTubeService.resetPaginationTokens();
    this.storageService.removeSessionStorageElement('LAST_SEARCHED_ITEM');
    this.storageService.removeSessionStorageElement('LAST_RESULTS');
  }

  public toggleHistory() {
    this.showHistory = this.searchInput.nativeElement.value === '';
  }

  public getSearchHistoryItems() {
    return JSON.parse(this.storageService.getLocalStorageItem('SEARCH_HISTORY'));
  }

  private initLastSearchResults() {
    this.youTubeService.moviesList = JSON.parse(this.storageService.getSessionStorageItem('LAST_RESULTS')).items;
    this.youTubeService.assignPaginationTokens(JSON.parse(this.storageService.getSessionStorageItem('LAST_RESULTS')));
  }

}
