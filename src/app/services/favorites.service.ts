import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  favoriteList = new BehaviorSubject<String[]>([]);

  addOrRemoveFavorite(idHouse: string) {
    console.log(idHouse);
    const favs = localStorage.getItem('favs');
    let favorites: string[] = [];

    if (favs) {
      favorites = JSON.parse(favs);
    }

    if (favorites.includes(idHouse)) {
      favorites = favorites.filter(id => id != idHouse);
    } else {
      favorites.push(idHouse);
    }

    this.favoriteList.next(favorites);
    localStorage.setItem('favs', JSON.stringify(favorites));
  }
}
