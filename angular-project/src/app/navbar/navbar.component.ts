import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../users/authservice';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

//   constructor(private authservice : AuthService) { }
//   isLoggedIn$ : Observable<boolean>;
//   ngOnInit() {
//     this.isLoggedIn$ = this.authservice.isUserLoggedIn;
//   }
// }
//constructor(private router:Router){}

// userName:string='';
// isLoggedIn:boolean=true;


// ngOnInit(): void {

// }
// logOut(){

//   this.router.navigate([''])
// }



//}




get isLoggedIn():boolean{
  const a = localStorage.getItem('isLoggedIn');
  console.log('local',a)
  if(a === 'yes')
    return true//this.authservice.isLoggedIn();
    return false;
  }


  get userName():string{

    console.log(this.authservice.currentUser?.username);

  if(this.authservice.currentUser)
  return this.authservice.currentUser?.username;

  return '';

  }
  constructor(private router:Router,private authservice:AuthService){}


    ngOnInit(): void {
    }

    logOut():void{
      this.authservice.logOut();
      localStorage.setItem('isLoggedIn','no')
      this.router.navigate(['/']);
    }
  }


