import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductComponent } from 'src/app/Product/product.component';
import { ProductService } from './product.service';

// import { VegesService } from './veges.ser';
import { VegeService } from './vegeService';

describe('Veges Service', () => {

    let service: ProductService;
    let injector: TestBed;
    let httpMock: HttpTestingController;
    let veges:Product[]=[];
    beforeEach(async () => {

        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule, ReactiveFormsModule, FormsModule,ProductComponent],

            providers: [ ProductService ]
        });
        service=TestBed.get(ProductService)
        injector = getTestBed();
        veges=[
          {
              "id":1,
              "name":"tomato",

              "image":"../assets/images/tomato.jpg",

              "qty":50,
              "price":"200",

              },
              {
                  "id":2,
                  "name":"Lady's finger",

                  "image":"../assets/images/lady.jpg",

                  "qty":50,
                  "price":"100",

              }
      ];

      httpMock=injector.get(HttpTestingController);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
    });



    it('should check createProduct()',()=>{
        let vegetable1={
            "id":2,
            "name":"Lady's finger",

            "image":"../assets/images/lady.jpg",

            "qty":1,
            "price":"100",

        };
        let vegetable2={
                "id":3,
                "name":"Cabbage",

                "image":"../assets/images/cabbage1.jpg",

                "qty":1,
                "price":"60",

        };
        veges=[...veges,vegetable1];
        service.createProduct(vegetable1).subscribe(
          (            response: any)=>expect(response).toEqual(vegetable1)
        )
        expect(veges.length).toEqual(3);
        const req=httpMock.expectOne(service.url);
        expect(req.request.method).toBe('POST');
        req.flush(vegetable1);

    });

  

    it('should check deleteProduct()',()=>{
        let vegetable1={
          "id":2,
          "name":"Lady's finger",

          "image":"../assets/images/lady.jpg",

          "qty":1,
          "price":"100",
        };
        let vegetable2={
          "id":2,
          "name":"Lady's finger",

          "image":"../assets/images/lady.jpg",

          "qty":1,
          "price":"100",
    };
    veges=[...veges,vegetable1,vegetable2];
    service.deleteProduct(vegetable2.id).subscribe(
      (        reponse: any)=>console.log(reponse)
    );
    expect(veges.length).toEqual(4);
    const req=httpMock.expectOne(`${service.url}/${vegetable2.id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(vegetable2);
    });



    })
