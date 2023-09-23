import { createReducer } from "@reduxjs/toolkit";
import { addProduct } from "../actions/addProduct";
import { editProduct } from "../actions/editProduct"
import { removeProduct } from "../actions/removeProduct"

const initialState = {
   products: [],
};

const reduxReducer = createReducer(initialState, {
   [addProduct]: (state, action) => {
      state.products.push(action.payload);
   },
   [editProduct]: (state, action) => {
      const productIndex = state.products.findIndex(
         (product) => product.id === action.payload.id
      );
      if (productIndex !== -1) {
         state.products[productIndex] = {
            ...state.products[productIndex],
            caption: action.payload.caption,
            amount: action.payload.amount,
         };
      }
   },
   [removeProduct]: (state, action) => {
      state.products = state.products.filter(
         (product) => product.id !== action.payload.id
      );
   },
});

export default reduxReducer





