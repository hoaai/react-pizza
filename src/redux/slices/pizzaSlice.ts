import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Sort } from './filterSlice';

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   sizes: number[];
   types: number[];
};

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'success',
   ERROR = 'error',
}

interface PizzaSliceState {
   items: Pizza[];
   status: Status;
}

export type SearchPizzaParams = {
   sortBy: string;
   order: string;
   category: string;
   search: string;
   currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const { sortBy, order, category, search, currentPage } = params;
      const response = await axios.get<Pizza[]>(
         `https://64a955088b9afaf4844a8e20.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      );

      return response.data;
   },
);

const initialState: PizzaSliceState = {
   items: [],
   status: Status.LOADING, //loading|succes|error
};

export const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {
      setItems(state, action: PayloadAction<Pizza[]>) {
         state.items = action.payload;
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = Status.LOADING;
            state.items = [];
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Status.SUCCESS;
            state.items = action.payload;
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = Status.ERROR;
            state.items = [];
         });
   },
});

export const selectPizzaData = (state: RootState) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
