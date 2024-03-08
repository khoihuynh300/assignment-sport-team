import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedFilters: { product_type: [], price: {}, tags: [] },
};
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedFilter: (state, action) => {
      const filterField = action.payload;
      state.selectedFilters = { ...state.selectedFilters, ...filterField };
    },
    resetFilter: (state) => {
      state.selectedFilters = { product_type: [], price: {}, tags: [] };
    },
  },
});

export const { setSelectedFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;
