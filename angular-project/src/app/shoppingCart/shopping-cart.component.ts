import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { ProductComponent } from '../Product/product.component';




@Component({

  selector: 'app-shopping-cart',

  templateUrl: './shopping-cart.component.html',

  styleUrls: ['./shopping-cart.component.css']

})

export class ShoppingCartComponent implements OnInit,OnChanges{

  ngOnInit(): void {



  }





  @Input() product1:Product={

    id:0,

    name:"",

    price:"",

    image:"",

     qty:1,
   //  total:1



    }



  productList:ProductQuantity[]=[];




add(pro:Product){

  for(let i=0;i<this.productList.length;i++){


    if(this.productList[i].product==pro){

       this.productList[i].quantity++;

       //this.productList[i].total+=this.productList[i].prices*this.productList[i].quantity;

     // this.productList[i].total+=this.productList[i].quantity*this.productList[i].price;
      // console.log(this.productList[i].total);



    }



  }





}



minus(pro:Product){

  for(let i=0;i<this.productList.length;i++){


    if(this.productList[i].product==pro){

       this.productList[i].quantity--;
      //this.productList[i].total=this.productList[i].quantity*this.productList[i].prices;

       if(this.productList[i].quantity==0){

        this.productList.splice(i,1);

       }



    }



  }





}



  ngOnChanges(changes: SimpleChanges): void {



    // console.log(this.product1);



    if(this.product1.name=="")

        return;



    let found=false;

    for(let i=0;i<this.productList.length;i++){


      if(this.productList[i].product==this.product1){

        this.productList[i].quantity++;

          found=true;

      }



    }



    if(found==false){

     let pro:ProductQuantity={product:this.product1,quantity:1,prices:this.product1,total:this.product1}

      this.productList.push(pro);



    }










  }







}





interface Product{

  id:number;

  name:string;

  price:string;

  image:string;

  qty:number;
  //total:number;




}

interface ProductQuantity{

  product:Product,

  quantity:number;

  total:Product,
  prices:Product

  //price:number;




}

