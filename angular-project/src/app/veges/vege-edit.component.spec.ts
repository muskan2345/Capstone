import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VegeEditComponent } from './vege-edit.component';

describe('VegeEditComponent', () => {
  let component: VegeEditComponent;
  let fixture: ComponentFixture<VegeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VegeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
