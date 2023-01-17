import { Injectable } from "@angular/core";
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from "src/app/users/user";
import { IProduct} from "src/app/veges/vege";


@Injectable({
    providedIn: 'root'
})

export class InMemoryEventDbService implements InMemoryDbService{
    createDb(){

      const users:User[]=[{
        username:'rishi',
        password:'rishi',
        isAdmin:true},

        {
          username:'kashish',
          password:'kashish',
          isAdmin:false},

          {
            username:'dev',
            password:'dev',
            isAdmin:false}]


        const products:IProduct[]=[{
            "id": 100,
            "name": "Apple",

            "image": "../../assets/fruit.jpg",
            "code":"EWrewrwe",
            "qty":3,
            "price":40,





          },{
            "id": 101,
            "name": "banana",

            "image": "../../assets/fruit2.jpg",
            "code":"EWrewrwe",
            "qty":3,
            "price":90




          },{
            "id": 102,
            "name": "Tomato",

            "image": "../../assets/fruit3.jpg",
            "code":"EWrewrwe",
            "qty":3,
            "price":34




          },{
            "id": 103,
            "name": "potatoe",

            "code":"EWrewrwe",
            "image": "../../assets/images.jpg",
            "qty":3,
            "price":34





          },{
            "id": 104,
            "name": "capsicum",

            "image": "../../assets/vege1.jpg",
            "code":"EWrewrwe",
            "qty":3,
            "price":89




          },{
            "id": 105,
            "name": "orange",

            "image": "../../assets/vege2.jpg",
            "code":"EWrewrwe",
            "qty":3,
            "price":56




          }];

          return {products,users}


}
}
