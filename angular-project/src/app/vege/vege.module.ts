import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';


import { VegeListComponent } from '../veges/vege-list.component';
import { VegeAddComponent } from '../veges/vege-add.component';
import { VegeRoutingModule } from './vege.module.routing';
import { productReducer } from '../state/veges/veges.reducer';
import { ProductEffects } from '../state/veges/veges.effects';



@NgModule({
  //declarations: [VegeListComponent,VegeAddComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    VegeRoutingModule,
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects])]

})
export class VegeModule { }
