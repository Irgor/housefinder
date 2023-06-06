import { Component, Input } from '@angular/core';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-house-card',
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.scss']
})
export class HouseCardComponent {

  @Input() data: House | undefined;

  getHouseTitle() {
    const type = this.data?.descricao.split(',')[0];
    return type + ' em ' + this.data?.cidade.toLocaleLowerCase();
  }

  openHouse() {
    window.open(this.data?.link);
  }

}
