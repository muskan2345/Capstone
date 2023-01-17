import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
    providedIn:'root'
})
export class AuthService{


 // private url:string='api/users';

   currentUser!:User|null ;
    redirectToUrl!:string;

    constructor(){}

    isLoggedIn():boolean{
        //return !this.currentUser;
        return !this.currentUser;
    }

    users:string[]=['muskan','gupta']

    login(username:string,password:string):boolean{


      console.log("ferfer0");

    if(this.users.includes(username)){
     this.currentUser={

        username,
        password,
        isAdmin:true
     };
    }else{
        this.currentUser={
            username,
            password,
            isAdmin:false
    };

    console.log(this.currentUser.username);
     console.log(this.currentUser.isAdmin);
      }
     return !this.currentUser;

    }

    logOut():void{
        this.currentUser=null;
    }
}

