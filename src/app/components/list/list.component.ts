import { Component, Input, OnChanges, OnInit, SimpleChanges, Type } from '@angular/core';
import { House } from 'src/app/models/house';
import { StatesService } from 'src/app/services/states.service';

import AC from '../../../assets/lists/imoveis_AC.json';
import AL from '../../../assets/lists/imoveis_AL.json';
import AM from '../../../assets/lists/imoveis_AM.json';
import AP from '../../../assets/lists/imoveis_AP.json';
import BA from '../../../assets/lists/imoveis_BA.json';
import CE from '../../../assets/lists/imoveis_CE.json';
import DF from '../../../assets/lists/imoveis_DF.json';
import ES from '../../../assets/lists/imoveis_ES.json';
import GO from '../../../assets/lists/imoveis_GO.json';
import MA from '../../../assets/lists/imoveis_MA.json';
import MG from '../../../assets/lists/imoveis_MG.json';
import MS from '../../../assets/lists/imoveis_MS.json';
import MT from '../../../assets/lists/imoveis_MT.json';
import PA from '../../../assets/lists/imoveis_PA.json';
import PB from '../../../assets/lists/imoveis_PB.json';
import PE from '../../../assets/lists/imoveis_PE.json';
import PI from '../../../assets/lists/imoveis_PI.json';
import PR from '../../../assets/lists/imoveis_PR.json';
import RJ from '../../../assets/lists/imoveis_RJ.json';
import RN from '../../../assets/lists/imoveis_RN.json';
import RO from '../../../assets/lists/imoveis_RO.json';
import RR from '../../../assets/lists/imoveis_RR.json';
import RS from '../../../assets/lists/imoveis_RS.json';
import SC from '../../../assets/lists/imoveis_SC.json';
import SE from '../../../assets/lists/imoveis_SE.json';
import SP from '../../../assets/lists/imoveis_SP.json';
import TO from '../../../assets/lists/imoveis_TO.json';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges, OnInit {
  @Input() state: string = '';
  @Input() type: string = '';
  @Input() city: string = '';
  @Input() maxPrice!: number;

  listNames: any = {
    'AC': AC as unknown as House[], 
    'AL': AL as unknown as House[], 
    'AM': AM as unknown as House[], 
    'AP': AP as unknown as House[], 
    'BA': BA as unknown as House[], 
    'CE': CE as unknown as House[], 
    'DF': DF as unknown as House[], 
    'ES': ES as unknown as House[], 
    'GO': GO as unknown as House[], 
    'MA': MA as unknown as House[], 
    'MG': MG as unknown as House[], 
    'MS': MS as unknown as House[], 
    'MT': MT as unknown as House[], 
    'PA': PA as unknown as House[], 
    'PB': PB as unknown as House[], 
    'PE': PE as unknown as House[], 
    'PI': PI as unknown as House[], 
    'PR': PR as unknown as House[], 
    'RJ': RJ as unknown as House[], 
    'RN': RN as unknown as House[], 
    'RO': RO as unknown as House[], 
    'RR': RR as unknown as House[], 
    'RS': RS as unknown as House[], 
    'SC': SC as unknown as House[], 
    'SE': SE as unknown as House[], 
    'SP': SP as unknown as House[], 
    'TO': TO as unknown as House[], 
  }

  listToShow: House[] = SP as unknown as House[];

  cities: string[] = [];

  constructor(public statesService: StatesService) {

  }

  ngOnInit() {
    this.findCities();
  }

  findCities() {
    this.cities = this.listToShow.map(row => row.cidade);

    this.cities = Array.from(new Set(this.cities));

    this.statesService.citiesFilter.next(this.cities)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.listToShow = this.listNames[this.state];

    if (this.type != 'all') {
      this.listToShow = this.listToShow.filter(row => row.descricao.includes(this.type))
    }

    if (this.city != 'all') {
      this.listToShow = this.listToShow.filter(row => row.cidade == this.city);
    }

    if(this.maxPrice && this.maxPrice > 0) {
      this.listToShow = this.listToShow.filter(row => +row.preco.split(',')[0].replace(/\./g,'') <= this.maxPrice);
    }

    this.findCities();
  }

}
