import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
//   form: FormGroup = new FormGroup({});

//   constructor(private fb: FormBuilder) { }

//   ngOnInit(): void {

//     this.form = this.fb.group({

//       id: [null, [Validators.required]],

//       name: [null, [Validators.required, Validators.minLength(10)]],

//       email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],

//       dob: [null, [Validators.required]],

//       address: [null],

//       country: [null],

//       gender: [null]

// });

//   }



//   saveDetails(form: any) {

//     alert('Submitted');

//   }


cForm!:FormGroup;
ngOnInit(): void {}
constructor(private router:Router){}

onSubmit(cForm:NgForm){
  alert('successfully submitted');
  console.log(cForm.value);
  this.router.navigate(['login']);
}

}
