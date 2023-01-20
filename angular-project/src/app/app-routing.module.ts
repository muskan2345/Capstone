import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductComponent } from './Product/product.component';
// import { AuthGuard } from './users/auth-guard.service';
import { LoginComponent } from './users/login.component';

import { VegeAddComponent } from './veges/vege-add.component';
import { VegeListComponent } from './veges/vege-list.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'aboutus',component:AboutUsComponent},
  {path:'contactus',component:ContactUsComponent},

  {path:'login',component:LoginComponent},

  {path:'vege',component:ProductComponent},
  {path:'payment',component:PaymentComponent},


  {
    path:'products',loadChildren:()=>import('../app/vege/vege.module').then(m=>m.VegeModule)
  },
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
