import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from 'src/shared/product.service';



// import { LoggingServie } from 'src/app/shared/logging.service';

// import { ProductService } from 'src/app/shared/product.service';



@Component({

  selector: 'app-product',

  templateUrl: './product.component.html',

  styleUrls: ['./product.component.css']

})




export class ProductComponent implements OnInit {



//productList=[];

 inp:string='';

title:string='';




constructor(private productService:ProductService){}




ngOnInit(): void {

    this.getFuntion();



  }

;




@Output() sendData:EventEmitter<Product>=new EventEmitter<Product>();




productList:Product[]=[];



getFuntion(){

this.productService.getProduct().subscribe((data:Product[])=>{



  this.productList=data;

  this.filteredList=data;



})

}



filteredList:any=this.productList;



filter(){

  this.filteredList=[];

  for(let i=0;i<this.productList.length;i++){

    if(this.productList[i].name.includes(this.inp)){

        console.log(this.productList[i]);

      this.filteredList.push(this.productList[i]);

    }

  }

}




productSend:Product={

  id:0,

  name:"",

  price:"",

  image:"",

  qty:1,


};




outputEvent(product:Product){

 // this.logginService.log(product);

  this.productSend=product;

  // this.sendData.emit(product);



}




newProduct():void{

  this.productService.changeSelectedProduct(this.productService.newProduct());

}



productSelected(product:Product):void{

  this.productService.changeSelectedProduct(product);

}




}






interface Product{

  id:number;

  name:string;

  price:string;

  image:string;
  qty:number;

}

