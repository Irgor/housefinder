import { Component, Input, OnChanges, OnInit, SimpleChanges, Type } from '@angular/core';
import sp from '../../../assets/lists/imoveis_SP.json';
import { House } from 'src/app/models/house';
import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges, OnInit {
  @Input() state: string = '';
  @Input() type: string = '';
  @Input() city: string = '';

  listNames: any = {
    'SP': sp as House[],
  }

  listToShow: House[] = sp as House[];

  cities: string[] = [];

  constructor(public statesService: StatesService) {

  }

  ngOnInit() {
    this.findCities();
  }

  findCities() {
    this.cities = this.listToShow.map(row => row.cidade);

    this.cities = Array.from(new Set(this.cities));

    console.log(this.cities);

    this.statesService.citiesFilter.next(this.cities)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listToShow = this.listNames[this.state];

    if (this.type != 'all') {
      this.listToShow = this.listToShow.filter(row => row.descricao.includes(this.type))
    }

    if(this.city != 'all') {
      this.listToShow = this.listToShow.filter(row => row.cidade == this.city);
    }

    this.findCities();
  }

}
