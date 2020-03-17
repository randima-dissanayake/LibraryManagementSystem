import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { Transaction } from 'src/app/model/Transaction';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  @Input() bookObj : Book
  @Input() transactionObj : Transaction
  @Input() userObj : User

  constructor() { }

  ngOnInit(): void {
  }

}
