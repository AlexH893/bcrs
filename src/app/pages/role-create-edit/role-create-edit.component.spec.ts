import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCreateEditComponent } from './role-create-edit.component';

describe('RoleCreateEditComponent', () => {
  let component: RoleCreateEditComponent;
  let fixture: ComponentFixture<RoleCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
