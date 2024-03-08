import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { addedItem } = action.payload;
      const existedItem = state.items.find((item) => item.id === addedItem.id);
      if (existedItem) {
        existedItem.quantity += addedItem.quantity;
      } else {
        state?.items?.push(addedItem);
      }
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state?.items?.find((item) => item.id === id);
      item.quantity = quantity;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;

      const items = state?.items?.filter((item) => item.id !== id);
      state.items = items;
    },
    removeMultipleItem: (state, action) => {
      const { itemsChecked } = action.payload;

      const items = state?.items?.filter((item) => !itemsChecked.includes(item.id));
      state.items = items;
    },
  },
});

export const { addToCart, changeQuantity, removeItem, removeMultipleItem, increment } =
  cartSlice.actions;

export default cartSlice.reducer;
