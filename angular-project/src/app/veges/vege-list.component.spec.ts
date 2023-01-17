import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { VegeListComponent } from './vege-list.component';

describe('VegeListComponent', () => {
  let component: VegeListComponent;
  let fixture: ComponentFixture<VegeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VegeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VegeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print show',()=>{
    const rootEle:DebugElement = fixture.debugElement;

    const btn =rootEle.query(By.css('.btn2'));

    const btnElement:HTMLElement= btn.nativeElement;

    expect(btnElement.textContent).toContain('SHOW');
  })
});
