import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, tap } from 'rxjs';
import { IProduct } from './vege';
import { State } from "../state/veges/veges.state";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GenericValidator } from "../../shared/GenericValidators";
import { VegeService } from 'src/shared/vegeService';
import { getCurrentProduct } from '../state/veges/veges.selector';
import * as ProductActions from '../state/veges/veges.action';

@Component({
  selector: 'app-vege-add',
  templateUrl: './vege-add.component.html',
  styleUrls: ['./vege-add.component.css']
})
export class VegeAddComponent {
  pageTitle='Edit Product';
  errorMessage='';
  product$!: Observable<IProduct | null | undefined  >;

  addProduct!: FormGroup;
  product!:IProduct | null | undefined;
  sub!:Subscription;
  displayMessage: {[key:string]:string}={};
    private validationMessages!:{[key:string]:{[key:string]:string}};

    private genericValidator!:GenericValidator;

    constructor(private store:Store<State>,private formBuilder: FormBuilder,private router: Router, private productService:VegeService ) {

      this.validationMessages={

      name:{
        required:'Product name is required ',
        minLength:'Product name must have 3 characters',
        maxLength:'Product name must have less than  equal to 10 chars'
      },

      price:{
        required:'Price is required'
      },image:{
        required:'Image is required'
      }


      };
      this.genericValidator=new GenericValidator(this.validationMessages);

   }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


  ngOnInit() {
   console.log('in init of product add ,creating form');
    this.addProduct = this.formBuilder.group({
      id: [],
      name: ['',[ Validators.required,Validators.minLength(3),Validators.maxLength(10)]],

      code:['',[Validators.required]],
      image:['',[Validators.required]],
      qty:['',[Validators.required]],
      price:['',[Validators.required]]




    });

    console.log('created add form ')

// Watch for changes to the currently selected product
    this.product$ = this.store.select(getCurrentProduct)
      .pipe(
        tap(currentProduct => this.displayProduct(currentProduct))
      );
this.sub=this.product$.subscribe(resp=>this.product=resp);
console.log('selected current product in ng onit add product ',this.product);
    // Watch for value changes for validation
    this.addProduct.valueChanges.subscribe(
      () => this.displayMessage =
      this.genericValidator.processMessages(this.addProduct)
    );
console.log('value in form changes')



    //when the product is selected from the product list , it should be displayed on the form

    


    this.addProduct.valueChanges.
    subscribe(()=>this.displayMessage=this.genericValidator.processMessages(this.addProduct));
  }
  get id(){
    return this.addProduct.get("id");
  }

  get name(){
    return this.addProduct.get("name");
    }

  get image(){
    return this.addProduct.get("image");
    }
  get code(){
    return this.addProduct.get("code");
      }
      get qty(){
        return this.addProduct.get("qty");
      }
      get price(){
        return this.addProduct.get("price");
      }



//method which renders the selected product on the form
  displayProduct(productParam:IProduct |null |undefined):void{
   console.log(this.product,'in display product of product add component ');
   this.product = productParam;
   if(this.product){
//reset the form to its original
    this.addProduct.reset();

    if(this.product.id==0){
      this.pageTitle='Add Product';
    }
    else{

      this.pageTitle=`Edit Product: ${this.product.name}`;

    }
 //update the data on the form
 this.addProduct.patchValue({
  id:this.product.id,
   name:this.product.name,
   image:this.product.image,

   code:this.product.code,
   qty:this.product.qty,
   price:this.product.price



 })


   }

  }

  saveProduct(originalProduct:IProduct):void{

    if(this.addProduct.valid){
      if(this.addProduct.dirty){

        const product={...originalProduct,...this.addProduct.value};

      if(product.id==0){

        this.store.dispatch(ProductActions.createProduct({product}));


     }
     else{this.store.dispatch(ProductActions.updateProduct({ product }));




     }
      }

      this.router.navigate(['products'])
    }

  }



  deleteProduct(prod:IProduct):void{
    if(prod && prod.id){

      if(confirm(`Are you sure you want to delete ${prod.name} details`)){


        this.store.dispatch(ProductActions.deleteProduct({ productId: prod.id }));


      }
      else{

this.store.dispatch(ProductActions.clearCurrentProduct());


      }
    }

  }

}
