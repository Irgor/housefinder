import { Component, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import sp from '../../../assets/lists/imoveis_SP.json';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnChanges {
  @Input() state: string = '';

  listNames: any = {
    'SP': sp as House[],
  }

  listToShow: House[] = sp as House[];

  ngOnChanges(changes: SimpleChanges): void {
    this.listToShow = this.listNames[this.state];
  }

}
