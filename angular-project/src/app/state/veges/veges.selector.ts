import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ProductState } from "./veges.state";

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {

    if (currentProductId === 0) {
      return {
        id:0,
        name:'',
        code:'',
        image:'',
        qty:34,
        price:2300

      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);
