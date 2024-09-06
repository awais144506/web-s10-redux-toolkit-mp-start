// ✨ create your `store` in this module
import { configureStore } from "@reduxjs/toolkit";
import QuoteReducer from "./quotesSlice"

export const store = configureStore({
    reducer:{
        quotes:QuoteReducer
    }
})