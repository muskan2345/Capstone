import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from './about-us/about-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module/material-module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './users/login.component';
import { VegeListComponent } from './veges/vege-list.component';
import { VegeAddComponent } from './veges/vege-add.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryEventDbService } from 'src/shared/inmemoryDb';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { VegeEditComponent } from './veges/vege-edit.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './Product/product.component';
import { ShoppingCartComponent } from './shoppingCart/shopping-cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    VegeListComponent,
    VegeAddComponent,
    VegeEditComponent,
    HomePageComponent,
    CartComponent,
    ProductComponent,
    ShoppingCartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryEventDbService),
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
