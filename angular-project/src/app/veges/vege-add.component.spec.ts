import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VegeAddComponent } from './vege-add.component';

describe('VegeAddComponent', () => {
  let component: VegeAddComponent;
  let fixture: ComponentFixture<VegeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VegeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should have the product name',()=>{
    expect(fixture.debugElement.query(By.css('.name'))).toBeTruthy();
  });

  it('should have the product Price',()=>{
    expect(fixture.debugElement.query(By.css('.code'))).toBeTruthy();
  });
  it('should have the product Image',()=>{
    expect(fixture.debugElement.query(By.css('.image'))).toBeTruthy();
  });
  it('should have the Product Quantity',()=>{
    expect(fixture.debugElement.query(By.css('.qty'))).toBeTruthy();
  });

  it('should have the Product Price',()=>{
    expect(fixture.debugElement.query(By.css('.price'))).toBeTruthy();
  });



});
