import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

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