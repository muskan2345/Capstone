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

//******************** declared below are observables for which we will use async pipe in template , no sub/unsub*/
products$!:Observable<IProduct[]>;
selectedProduct$!:Observable<any>;
errorMessage$!: Observable<string>;

//*************** */
dataReceived=this.productService.getProducts();
obsProducts$!:Observable<IProduct[]>;
@Output() OnProductSelection:EventEmitter<IProduct>=new EventEmitter<IProduct>();

  constructor(private productService:VegeService,
    private router:Router,private store:Store<State>){ }


  ngOnInit(): void {
    this.href=this.router.url;

   // Do NOT subscribe here because it uses an async pipe
    // This gets the initial values until the load is complete.
    this.products$ = this.store.select(getProducts);
   // this.products$.subscribe(resp=>this.filteredProducts=resp);
    // Do NOT subscribe here because it uses an async pipe
    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    // Do NOT subscribe here because it uses an async pipe
    this.selectedProduct$ = this.store.select(getCurrentProduct);

     }

     ngOnDestroy(): void {
       //this.sub.unsubscribe();
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

  // this.productService.changeSelectedProduct(this.productService.newProduct());
  // console.log('back to newProduct from service ');
  this.store.dispatch(ProductActions.initializeCurrentProduct());
   this.router.navigate([this.href,'addVege']);
}


 productSelected(product:IProduct):void{
  //this.productService.changeSelectedProduct(product);
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
