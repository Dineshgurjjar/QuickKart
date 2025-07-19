// /src/features/productSlice.js (Updated Version)

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // 🔽 UPDATE THIS LINE 🔽
  const response = await axios.get('https://dummyjson.com/products?limit=100');
  
  // The new API nests products inside a 'products' key
  return response.data.products; 
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    searchTerm: '',
    viewMode: 'grid', // 'grid' | 'list'
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      });
  },
});

export const { setSearchTerm, setViewMode } = productSlice.actions;
export default productSlice.reducer;