import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private apiKey: string = 'AIzaSyAd0JPlPlhwEBYBMYDenBvUA0Q52Vt-xx8';
  private baseUrl: string = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey;

  constructor(private http: HttpClient, private storageService: StorageService) {}

  public currentSearchItem: string;
  public moviesList: Array<Object> = [];
  public noResults = false;
  public searchConfig = {
    url: this.baseUrl,
    part: 'snippet',
    type: 'video',
    maxResults: '10',
    pageToken: '',
    prevPageToken: '',
    nextPageToken: '',
  };

  public getSearchResults(searchItem: string): Observable<Object> {
    this.currentSearchItem = searchItem;    
    let url = this.searchConfig.url + 
              '&part=' + this.searchConfig.part +
              '&type=' + this.searchConfig.part + 
              '&maxResults=' + this.searchConfig.maxResults +
              '&pageToken=' + this.searchConfig.pageToken +
              '&prevPageToken=' + this.searchConfig.prevPageToken +
              '&nextPageToken=' + this.searchConfig.nextPageToken +
              '&q=' + searchItem;

    return this.http.get(url).pipe(map((res: any) => {
      return (
        this.storageService.setSessionStorageItem('LAST_RESULTS', JSON.stringify(res)),
        this.assignPaginationTokens(res),
        this.moviesList = res.items,
        this.checkIfNoResults(res.items)
      );
    }))
  }

  public resetPaginationTokens() {
    this.searchConfig.pageToken = '';
    this.searchConfig.prevPageToken = '';
    this.searchConfig.nextPageToken = '';
  }

  public getNextPageResults() {
    this.searchConfig.pageToken = this.searchConfig.nextPageToken;
    this.getSearchResults(this.currentSearchItem).subscribe();
  }

  public getPrevPageResults() {
    this.searchConfig.pageToken = this.searchConfig.prevPageToken;
    this.getSearchResults(this.currentSearchItem).subscribe();
  }
  
  public assignPaginationTokens(searchResponse: any) {
    this.searchConfig.prevPageToken = searchResponse.prevPageToken || '';
    this.searchConfig.nextPageToken = searchResponse.nextPageToken || '';
  }

  private checkIfNoResults(results: Array<Object>) {
    return this.noResults = !results.length;
  }

}