import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() childItem: string;
  @Input() color:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}