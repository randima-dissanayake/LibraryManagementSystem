import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OldTransactionsComponent } from './old-transactions.component';

describe('OldTransactionsComponent', () => {
  let component: OldTransactionsComponent;
  let fixture: ComponentFixture<OldTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
