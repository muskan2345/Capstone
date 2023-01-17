import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { VegeAddComponent } from "../veges/vege-add.component";
import { VegeEditComponent } from "../veges/vege-edit.component";
import { VegeListComponent } from "../veges/vege-list.component";

const productRoutes: Routes = [
  {path:'',component:VegeListComponent},
    { path: 'addVege', component: VegeAddComponent },
    //{path: 'addPlace', component: PlaceAddComponent },
    {path: 'editVege', component: VegeEditComponent }
  ];

  @NgModule({
    imports: [

      RouterModule.forChild(productRoutes),],
    exports:[RouterModule]})
  export class VegeRoutingModule{

  }
