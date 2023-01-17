import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap, catchError, throwError, map } from "rxjs";
import { IProduct } from "../app/veges/vege";

@Injectable({
  providedIn:'root'
})
export class VegeService{
 foundIndex:number=0;
 //angular DI will resolve the dependency of ProductService class on HttpClient
  //A -- B --C
  //ProductListComponent it has a dependency mentioned in the constructors
  //P roductService --constructor -- it says ProductService has  a dependency of type HttpClient

  ///api/products --will be resolved from in-memory web api -- /api/products
public url="api/products";
products:IProduct[]=[];

//why are we using BehaviorSubject
//BehaviorSubject is a subtype of Observable
//BehaviorSubject --it will emit only the last value of the source observable
//BehaviorSubject will ensure that every consumer get recent most value
//selection --selected object from the list of values
private selectedProductSource= new BehaviorSubject<IProduct | null >(null);

//conventionally you can put $ to the var if it is a Observable
selectedProductChanges$=this.selectedProductSource.asObservable();

//why are we passing http in the constructor as an argument
//what will angular do here
//angular will inject the httpclient dependency in productservice
//productservice needs to send http requests -- get post put delete
constructor(private http:HttpClient){
  //we a re not writing any code

}

//retrieving all the products from api
//method name is getProducts( ) --no args
//what it is returning  ,what is the return type
//return type is mentioned after the method name and a colon
//return type  is Observable<IProduct[]>

getProducts():Observable<IProduct[]>{
  //what is the logic
  //to get array of IProduct from db
  //get method is a generic method IProduct[]
  //arguments u are passing this.url api/products --- api
  //pipe -- operator in rxjs  where you ca
  return this.http.get<IProduct[]>(this.url).pipe(

      tap(data=>{console.log(data);
        //we are assigning data to this.products
        this.products=data;
  }),
      catchError(this.errorHandler)
  );

}



changeSelectedProduct(selectedProduct:IProduct | null):void{

this.selectedProductSource.next(selectedProduct);

}

//errorhandler which returns the Observable with errorMessage
errorHandler=(err:any)=>{

 let errorMessage:string;
 //a client side error or network error then ErrorEvent object will be thrown

 if(err.error instanceof ErrorEvent)
   {

     errorMessage = `An error has occured ${err.error.message}`
   }
   else{

    errorMessage =  `Backend error code ${err.status} ${err.body.error}`;

   }
   console.log(err);
   return throwError(errorMessage);


}


// a method newProduct which acts like a constructor of creating a new Product
//what is name of the method -- newProduct
//how many args --zero args
//return type IProduct

newProduct():IProduct{
//logic should focus on sending back a IProduct
  return {

       id:0,
      name:'',

     code:'',
      image:'\\assets\\images\\tomato.jpg',
      qty:0,
      price:0




  };

}


//what ever is in the request body, that is the object of IProduct
//http post request  with the request body and request headers -content type application/json
//url is the collection of events ==  /api/events

//what is the method name --createProduct
//args -- product of type IProduct
//return Observable<IProduct>

createProduct(product:IProduct):Observable<IProduct>{
   //headers variable to set request headers
  const headers= new HttpHeaders({'Content-Type':'application/json'});
  //const size = this.getProducts.length;
 // const id =size+1;
      //newProduct spread across product
    const newProduct={...product,id:null};
  console.log(`in create method  ${this.url}`)

    //return logic starts here
    //http .post method
    //generics method -- IProduct
    //args --3 url , newProduct ,headers
    //this.url -- declared in the class outside the functions
    return     this.http.post<IProduct>(this.url,newProduct,{headers})
    .pipe(
      tap(data=>{

       console.log('in create new product'+ JSON.stringify(data));
       //pushing the new data new Product to the products array
      // this.products.push(data);
       console.log(JSON.stringify(this.products));

      },
      catchError(this.errorHandler)
      )
    )
}
//delete  api/events --- delete mapping api/events/1

deleteProduct(id:number):Observable<{}>{
  const headers= new HttpHeaders({'Content-Type':'application/json'});

  //@DeleteMapping deleteAll delete url/id  /api/products/111
  const url= `${this.url}/${id}`;

  return this.http.delete<IProduct>(url,{headers})
  .pipe(
    tap(data=>{
      console.log('deleted prd'+id);
     const foundIndex = this.products.findIndex(item=>item.id===id);
     //if product id is not found means index returned will be -1
     //if(foundIndex > -1)
    // this.products.splice(foundIndex,1);


    },
    catchError(this.errorHandler))


  );





}




//update a product
// means two steps -- one when the user selects a particular data from the list and clicks on edit button
//you can render a new component ProductEditComponent --form with all the required fields
// name price qty
//ngOnInit -- it should get the values of the selectedProduct  from the ProductListComponent
//in that form , pre fill the data from the db with the selected product
//user will modify
//user will submit  ,this new product data will be used in http put with the id
 getProductById(id:number):Observable<IProduct>{
  return this.getProducts().pipe(
    tap(()=>{console.log('fetch product'+id);
     this.foundIndex =this.products.findIndex(item=>item.id ==id);
    //if(this.foundIndex > -1){
      //this.products[this.foundIndex];
       // }
    }),
    map(()=>this.products[this.foundIndex]),
    catchError(this.errorHandler)
    );





 }
 updateProduct(product:IProduct):Observable<IProduct>{
  const headers= new HttpHeaders({'Content-Type':'application/json'});

  //put http method
  const url= `${this.url}/${product.id}`;

  //logic to call http put method to update the product on the given url
  return this.http.put<IProduct>(url,product, {headers}).pipe(

  tap(()=>{console.log('update product'+product.id);
  const foundIndex =this.products.findIndex(item=>item.id === product.id);
 // if(foundIndex > -1){
   // this.products[foundIndex]=product;
     // }
  }),
  map(()=>product),
  catchError(this.errorHandler)
  );






 }





}
