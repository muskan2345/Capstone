import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './authservice';
import { User } from './user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

//   pageTitle:string='Log In';
// @ViewChild('loginForm',{})loginForm!:NgForm;
//  constructor(private authService:AuthService,private router:Router) { }



//   cancel():void{

//     this.router.navigate([' ']);
//   }
//   onSubmit(loginForm:NgForm){
//     if(loginForm && loginForm.valid){
//       let username = loginForm.form.value.username;
//       const password=loginForm.form.value.password;

//       //username=this.loginForm.controls['username'].get;

//       //console.log(username);

//      // console.log(this.authService.login(username,password));

//       if(this.authService.isLoggedIn()){
//         //console.log("muskan" );

//        //  this.router.navigate(['products']);
//        // this.router.navigateByUrl(this.authService.redirectToUrl);
//       }
//       else{
//       // this.router.navigate(['products']);
//       //this.router.navigateByUrl(this.authService.redirectToUrl);
//      // this.router.navigate(['vege']);
//        console.log("wfewf");
//       }



//     }
//               var uname=this.loginForm.form.value.username;
//               var pass=this.loginForm.form.value.password;

//               if(uname=="admin" && pass=="admin"){
//                     this.router.navigate(['products']);
//               }
//               else{
//                 this.router.navigate(['']);
//               }






//   }


pageTitle:string='Log In';
@ViewChild('loginForm',{})loginForm!:NgForm;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  cancel():void{

    this.router.navigate(['about']);
  }
  onSubmit(loginForm:NgForm){
    if(loginForm && loginForm.valid){
      console.log('in ifff');
      localStorage.setItem("isLoggedIn", 'yes');
      const username = loginForm.form.value.username;
      const password=loginForm.form.value.password;

      // username=this.loginForm.controls['username'].get;

      console.log(username);

      this.authService.login(username,password);

      // if(this.authService.redirectToUrl){
      //   this.router.navigate(['vege'])
      //   //this.router.navigateByUrl(this.authService.redirectToUrl);
      // }
      // else{
      //   this.router.navigate(['products']);
      // }

      if(username=="admin" && password=="admin"){
          this.router.navigate(['products']);
       }
          else{
             this.router.navigate(['vege']);
          }



    }




  }

}


