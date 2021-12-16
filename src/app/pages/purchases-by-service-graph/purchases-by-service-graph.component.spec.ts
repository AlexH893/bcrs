import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesByServiceGraphComponentComponent } from './purchases-by-service-graph-component.component';

describe('PurchasesByServiceGraphComponentComponent', () => {
  let component: PurchasesByServiceGraphComponentComponent;
  let fixture: ComponentFixture<PurchasesByServiceGraphComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasesByServiceGraphComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesByServiceGraphComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
