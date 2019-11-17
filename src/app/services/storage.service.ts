import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public initSearchHistory() {
    JSON.parse(this.getLocalStorageItem('SEARCH_HISTORY')) === null ? this.setLocalStorageItem('SEARCH_HISTORY', JSON.stringify([])) : null;
  }

  public addToSearchHistory(item: string) {
    const searchHistoryArray = JSON.parse(this.getLocalStorageItem('SEARCH_HISTORY'));
    if(!searchHistoryArray.includes(item)) {
      searchHistoryArray.push(item);
      this.setLocalStorageItem('SEARCH_HISTORY', JSON.stringify(searchHistoryArray));
    }
  }
 
  public getLocalStorageItem(key: string) {
    return localStorage.getItem(key);
  }

  private setLocalStorageItem(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  public getSessionStorageItem(key: string) {
    return sessionStorage.getItem(key);
  }

  public setSessionStorageItem(key: string, value: string) {
    return sessionStorage.setItem(key, value);
  }

  public removeSessionStorageElement(key: string) {
    return sessionStorage.removeItem(key);
  }

}
