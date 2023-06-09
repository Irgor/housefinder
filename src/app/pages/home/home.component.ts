import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatesService } from 'src/app/services/states.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  isFavs = false;

  state: string = 'SP';
  type: string = 'all';
  city: string = 'all';

  cities: string[] = [];

  maxPrice!: number;

  prices = Array(20).fill(0).map((x, i) => (i + 1) * 10000);

  subs!: Subscription;

  states = [
    { name: 'Acre', value: 'AC' },
    { name: 'Alagoas', value: 'AL' },
    { name: 'Amapá', value: 'AP' },
    { name: 'Amazonas', value: 'AM' },
    { name: 'Bahia', value: 'BA' },
    { name: 'Ceará', value: 'CE' },
    { name: 'Distrito Federal', value: 'DF' },
    { name: 'Espírito Santo', value: 'ES' },
    { name: 'Goiás', value: 'GO' },
    { name: 'Maranhão', value: 'MA' },
    { name: 'Mato Grosso', value: 'MT' },
    { name: 'Mato Grosso do Sul', value: 'MS' },
    { name: 'Minas Gerais', value: 'MG' },
    { name: 'Pará', value: 'PA' },
    { name: 'Paraíba', value: 'PB' },
    { name: 'Paraná', value: 'PR' },
    { name: 'Pernambuco', value: 'PE' },
    { name: 'Piauí', value: 'PI' },
    { name: 'Rio de Janeiro', value: 'RJ' },
    { name: 'Rio Grande do Norte', value: 'RN' },
    { name: 'Rio Grande do Sul', value: 'RS' },
    { name: 'Rondônia', value: 'RO' },
    { name: 'Roraima', value: 'RR' },
    { name: 'Santa Catarina', value: 'SC' },
    { name: 'São Paulo', value: 'SP' },
    { name: 'Sergipe', value: 'SE' },
    { name: 'Tocantins', value: 'TO' },
  ]

  constructor(public statesService: StatesService) {

  }

  ngOnInit() {
    this.subs = this.statesService.citiesFilter.subscribe(cities => {
      this.cities = cities;
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  
  goToFavs() {
    this.isFavs = !this.isFavs;
  }
}
