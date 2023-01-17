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
    expect(fixture.debugElement.query(By.css('#name'))).toBeTruthy();
  });
  it('should have the product price',()=>{
    expect(fixture.debugElement.query(By.css('#price'))).toBeTruthy();
  });

  it('should have the product image',()=>{
    expect(fixture.debugElement.query(By.css('#image'))).toBeTruthy();
  });

  
});
