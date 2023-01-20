import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { VegeService } from 'src/shared/vegeService';
import { getCurrentProduct, getError, getProducts } from '../state/veges/veges.selector';
import { IProduct } from './vege';
import { State } from "../state/veges/veges.state";
import * as ProductActions from '../state/veges/veges.action';
@Component({
  selector: 'app-vege-list',
  templateUrl: './vege-list.component.html',
  styleUrls: ['./vege-list.component.css']
})
export class VegeListComponent {

  showImage:boolean=false;
  errorMessage:string='';
sub!:Subscription;
prod!:IProduct;
products:IProduct[]=[];
pageTitle:string="Product List "
filteredProducts:IProduct[]=[];
selectedProduct!:IProduct | null;
filterValue!:string;
href:string='';

//declared below are observables for which we will use async pipe in template , no sub/unsub*/
products$!:Observable<IProduct[]>;
selectedProduct$!:Observable<any>;
errorMessage$!: Observable<string>;


dataReceived=this.productService.getProducts();
obsProducts$!:Observable<IProduct[]>;
@Output() OnProductSelection:EventEmitter<IProduct>=new EventEmitter<IProduct>();

  constructor(private productService:VegeService,
    private router:Router,private store:Store<State>){ }


  ngOnInit(): void {
    this.href=this.router.url;

  // these  are the  observable
    this.products$ = this.store.select(getProducts);

    // Here we will be using async pipe so need not to subscribe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

   
    this.selectedProduct$ = this.store.select(getCurrentProduct);

     }



  showImageVisibility(){
    this.showImage=!this.showImage;

  }



   filterData(val:string){




   this.filteredProducts=this.products.filter((p)=>p.name===val);
  }


  onRatingClicked(msg:string):void{
    this.pageTitle='My Angular App ' +msg;
  }

 onSelect(p:IProduct){
  this.OnProductSelection.emit(p);
 }

newProduct():void{
   console.log('in new product');


  this.store.dispatch(ProductActions.initializeCurrentProduct());
   this.router.navigate([this.href,'addVege']);
}


 productSelected(product:IProduct):void{

this.store.dispatch(ProductActions.setCurrentProduct({currentProductId:product.id}));
this.router.navigate([this.href,'editVege']);
}
  getProductById(id:number):IProduct{
    this.productService.getProductById(id).subscribe(resp=>this.prod=resp);
    return this.prod;
  }

  deleteProduct(place:IProduct):void{

    if(place && place.id){
      if(confirm(`Are you sure to delete ${place.name} details`)){
        this.store.dispatch(ProductActions.deleteProduct({productId:place.id}));
      }else{
        this.store.dispatch(ProductActions.clearCurrentProduct());
      }
    }
  }




}
