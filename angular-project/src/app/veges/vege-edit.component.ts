import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {  Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { VegeService } from 'src/shared/vegeService';
import { getCurrentProduct } from '../state/veges/veges.selector';
import { IProduct } from './vege';
import { State } from "../state/veges/veges.state";
import * as ProductActions from '../state/veges/veges.action';
@Component({
  selector: 'app-vege-edit',
  templateUrl: './vege-edit.component.html',
  styleUrls: ['./vege-edit.component.css']
})
export class VegeEditComponent {

  pageTitle:string="EDIT";
  errorMessage='';
  product$!: Observable<IProduct | null | undefined>;

  addProduct!: FormGroup;
  product!:IProduct | null |undefined;
  sub!:Subscription;

  constructor(private store:Store<State>,private formBuilder: FormBuilder,private router: Router, private productService:VegeService ){}

  ngOnInit(): void {

    this.addProduct= this.formBuilder.group({
      id:['',[Validators.required]],
      name:['',[Validators.required]],
      image:['',[Validators.required]],

      code:['',[Validators.required]],
      qty:['',[Validators.required]],
      price:['',[Validators.required]]


    });

    this.product$= this.store.select(getCurrentProduct).pipe(
      tap(currentProduct => this.displayproduct(currentProduct))
    );

    this.product$.subscribe(resp=> this.product=resp);

  }
  // for reactive form we need to get 
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
  get price(){
    return this.addProduct.get("price");
  }
  get qty(){
    return this.addProduct.get("qty");
  }



  displayproduct(productParam:IProduct | null | undefined ):void{
    this.product=productParam;

    if(this.product){

      this.addProduct.reset();

      this.pageTitle=`Edit ${this.product.name} Details`;

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

  saveProduct(originalproduct : IProduct | undefined | null):void{

    if(this.addProduct.valid){
      if(this.addProduct.dirty){

        const product={...originalproduct,...this.addProduct.value};

        this.store.dispatch(ProductActions.updateProduct({product}));
      }

      this.router.navigate(['products']);
    }
  }


  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }

}
