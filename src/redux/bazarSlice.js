import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productData: [],
    userInfo: null,
};


export const bazarSlice = createSlice({
    name: "bazar",
    initialState,
    reducers: {
      addToCart: (state, action) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        const item = state.productData.find(
            (item) => item._id === action.payload._id
        );

        if (item) {
            item.quantity += action.payload.quantity;
        } else {
            state.productData.push(action.payload);
        }
      },
      deleteItem: (state, action) => {
        state.productData = state.productData.filter(
          (item) => item._id !== action.payload
        );
      },
      resetCart: (state) => {
        state.productData = [];
      },
      incrementQuantity: (state, action) => {
        const item = state.productData.find(
          (item) => item._id === action.payload._id
        );
        if (item){
          item.quantity++;
        }
      },
      decrementQuantity: (state, action) => {
        const item = state.productData.find(
          (item) => item._id === action.payload._id
        );
        if(item.quantity === 1){
          item.quantity = 1;
        } else {
          item.quantity--;
        }
      },

      addUser: (state, action) => {
        state.userInfo = action.payload;
      },
      removeUser: (state) => {
        state.userInfo = null;
      },
    },
  });

  // Action creators are generated for each case reducer function
export const {
  addToCart, 
  deleteItem, 
  resetCart, 
  incrementQuantity, 
  decrementQuantity,
  addUser,
  removeUser 
} = bazarSlice.actions;

export default bazarSlice.reducer;