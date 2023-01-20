import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("Testing Form Validation with all the Valid Fields",()=>{//The Form Must BE Valid When All The fields Entered is valid
    fixture.detectChanges();

    component.cForm.setValue({
      firstname:"mushi",
      lastName:"gupta",

      comments:"All Services Are Good!",
      store:"Insta Mart"
    });

    fixture.detectChanges();
    expect(component.cForm.valid).toBeTruthy();
  });

  it("Testing Form Validation with name InValid Fields",()=>{ //The Form Must Be Invalid when the name is Invalid
    fixture.detectChanges();

    component.cForm.setValue({
      firstname:"muskan2105",
      lastName:"gupta48",

      comments:"All Services Are Good!",
      store:"Insta Mart"
    });

    fixture.detectChanges();
    expect(component.cForm.valid).toBeFalsy();
  });
});
