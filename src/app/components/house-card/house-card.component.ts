import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { House } from 'src/app/models/house';
import { Subscription } from 'rxjs';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent implements OnInit, OnDestroy{

  @Input() data: House | any = {};

  isFav = false;
  sub!: Subscription;

  constructor(private favs: FavoritesService){}

  ngOnInit() {
    this.sub = this.favs.favoriteList.subscribe(fav => {
      this.isFav = fav.includes(this.data!.id);
    })
  }
  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getHouseTitle() {
    const type = this.data?.descricao.split(',')[0];
    return type + ' em ' + this.data?.cidade.toLocaleLowerCase();
  }

  openHouse() {
    window.open(this.data?.link);
  }

  favorite() {
    this.favs.addOrRemoveFavorite(this.data?.id);
  }

}
