import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the username',()=>{

    expect(fixture.debugElement.query(By.css('#username'))).toBeTruthy();

  });



  it('should have the password',()=>{

    expect(fixture.debugElement.query(By.css('#password'))).toBeTruthy();

  })



  it('should check type of username is text',()=>{

    const username=fixture.debugElement.query(By.css('#username'));

    const username2=username.nativeElement.getAttribute('type');

    expect(username2).toEqual('text');

  });



  it('should check name of the username',()=>{

    const name2=fixture.debugElement.query(By.css('#username'));

    const name3=name2.nativeElement.getAttribute('name');

    expect(name3).toEqual('username');

  });



  it('should check name of password',()=>{

    const pass=fixture.debugElement.query(By.css('#password'));

    const pass2=pass.nativeElement.getAttribute('name');

    expect(pass2).toEqual('password');

  });

  it('should check type of password',()=>{

    const passtype=fixture.debugElement.query(By.css('#password'));

    const passtype2=passtype.nativeElement.getAttribute('type');

    expect(passtype2).toEqual('password');

  });

  
});
