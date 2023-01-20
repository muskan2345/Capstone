import { Injectable } from "@angular/core";



import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";

import { HttpClient, HttpHeaders } from "@angular/common/http";






@Injectable({

    providedIn:'root'

})

export class ProductService{

    constructor(private http:HttpClient){}



     url:string='api/products';

     products:Product[]=[];




     private selectedProductSource=new BehaviorSubject<Product | null>(null);



     selectedProductChanges$=this.selectedProductSource.asObservable();



    getProduct():Observable<Product[]>{

      return this.http.get<Product[]>(`${this.url}`).pipe(

        tap(data=> {console.log(data);

          this.products=data;

        }),

        catchError(this.errorHandler)

      );



    }



    changeSelectedProduct(selecedProduct:Product | null):void{

      console.log(selecedProduct);

      this.selectedProductSource.next(selecedProduct);

    }




    errorHandler=(err:any)=>{

      let errorMessage:string;



      if(err.error instanceof ErrorEvent){

        errorMessage=`An error has occures ${err.error.message}`;

      }else{

        errorMessage=`Backend error code ${err.status} ${err.body.error}`;

      }



      console.log(err);

      return throwError(errorMessage);

    }





    newProduct():Product{

      return{

        id:0,

        name:'',


        price:"",

        image:"",

        qty:0

      };

    }




    createProduct(product:Product):Observable<Product>{

      //headers variable to set request headers

     const headers= new HttpHeaders({'Content-Type':'application/json'});



         //newProduct spread across product

       const newProduct={...product,id:null};





       //return logic starts here

       //http .post method

       //generics method -- IProduct

       //args --3 url , newProduct ,headers

       //this.url -- declared in the class outside the functions

       return     this.http.post<Product>(this.url,newProduct,{headers})

       .pipe(

         tap(data=>{



          console.log('in create new product'+ JSON.stringify(data));

          //pushing the new data new Product to the products array

          this.products.push(data);



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



     return this.http.delete<Product>(url,{headers})

     .pipe(

       tap(data=>{

         console.log('deleted prd'+id);

        const foundIndex = this.products.findIndex(item=>item.id===id);

        //if product id is not found means index returned will be -1

        if(foundIndex > -1)

        this.products.splice(foundIndex,1);





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



    updateProduct(product:Product):Observable<Product>{

     const headers= new HttpHeaders({'Content-Type':'application/json'});



     //put http method

     const url= `${this.url}/${product.id}`;



     //logic to call http put method to update the product on the given url

     return this.http.put<Product>(url,product, {headers}).pipe(



     tap(()=>{console.log('update product'+product.id);

     const foundIndex =this.products.findIndex(item=>item.id === product.id);

     if(foundIndex > -1){

       this.products[foundIndex]=product;

         }

     }),

     map(()=>product),

     catchError(this.errorHandler)

     );













    }











 }

 interface Product{

  id:number;

  name:string;

  price:string;

  image:string;
  qty:number;








}
