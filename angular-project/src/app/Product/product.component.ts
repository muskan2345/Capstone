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
  //total:number;
}


// showImage:boolean=false;
//   errorMessage:string='';
// sub!:Subscription;
// prod!:IProduct;
// products:IProduct[]=[];
// pageTitle:string="Product List "
// filteredProducts:IProduct[]=[];
// selectedProduct!:IProduct | null;
// filterValue!:string;
// href:string='';

// //******************** declared below are observables for which we will use async pipe in template , no sub/unsub*/
// products$!:Observable<IProduct[]>;
// selectedProduct$!:Observable<any>;
// errorMessage$!: Observable<string>;

// //*************** */
// dataReceived=this.productService.getProducts();
// obsProducts$!:Observable<IProduct[]>;
// @Output() OnProductSelection:EventEmitter<IProduct>=new EventEmitter<IProduct>();

//   constructor(private productService:VegeService,
//     private router:Router,private store:Store<State>){ }


//   ngOnInit(): void {
//     this.href=this.router.url;

//    // Do NOT subscribe here because it uses an async pipe
//     // This gets the initial values until the load is complete.
//     this.products$ = this.store.select(getProducts);
//    // this.products$.subscribe(resp=>this.filteredProducts=resp);
//     // Do NOT subscribe here because it uses an async pipe
//     this.errorMessage$ = this.store.select(getError);

//     this.store.dispatch(ProductActions.loadProducts());

//     // Do NOT subscribe here because it uses an async pipe
//     this.selectedProduct$ = this.store.select(getCurrentProduct);

//      }

//      ngOnDestroy(): void {
//        //this.sub.unsubscribe();
//   }


//   showImageVisibility(){
//     this.showImage=!this.showImage;

//   }



//    filterData(val:string){




//    this.filteredProducts=this.products.filter((p)=>p.name===val);
//   }


//   onRatingClicked(msg:string):void{
//     this.pageTitle='My Angular App ' +msg;
//   }

//  onSelect(p:IProduct){
//   this.OnProductSelection.emit(p);
//  }

// newProduct():void{
//    console.log('in new product');

//   // this.productService.changeSelectedProduct(this.productService.newProduct());
//   // console.log('back to newProduct from service ');
//   this.store.dispatch(ProductActions.initializeCurrentProduct());
//    this.router.navigate([this.href,'addVege']);
// }


//  productSelected(product:IProduct):void{
//   //this.productService.changeSelectedProduct(product);
// this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
// this.router.navigate([this.href,'editVege']);
// }
//   getProductById(id:number):IProduct{
//     this.productService.getProductById(id).subscribe(resp=>this.prod=resp);
//     return this.prod;
//   }

//   deleteProduct(place:IProduct):void{

//     if(place && place.id){
//       if(confirm(`Are you sure to delete ${place.name} details`)){
//         this.store.dispatch(ProductActions.deleteProduct({productId:place.id}));
//       }else{
//         this.store.dispatch(ProductActions.clearCurrentProduct());
//       }
//     }
//   }





// }

