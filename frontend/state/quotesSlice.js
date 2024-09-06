// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit"

let id = 1
const getNextId = () => id++
export const QuoteSlice = createSlice({
  name: "quotes",
  initialState: {
    displayAllQuotes: true,
    highlightedQuote: null,
    quotes: [
      {
        id: getNextId(),
        quoteText: "Don't cry because it's over, smile because it happened.",
        authorName: "Dr. Seuss",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "So many books, so little time.",
        authorName: "Frank Zappa",
        apocryphal: false,
      },
      {
        id: getNextId(),
        quoteText: "Be yourself; everyone else is already taken.",
        authorName: "Oscar Wilde",
        apocryphal: false,
      },
    ],
  },
  reducers: {
    createNewQuote: {
      prepare({quoteText,authorName}){
        return {
          payload:{id:getNextId(),quoteText,authorName,apocryphal:false}
        }
      },
      reducer(state,action){
        state.quotes.push(action.payload)
      }
    },
    deleteQuote(state, action) {
      state.quotes = state.quotes.filter(qt=>
        qt.id!==action.payload
      )
    },
    highlightQuote(state, action) {
      if (state.highlightedQuote === action.payload) {

        state.highlightedQuote = null
      }
      else {
        state.highlightedQuote = action.payload
      }
    },
    toggleQuotes(state) {
      state.displayAllQuotes = !state.displayAllQuotes
    },
    authenticQuote(state, action) {
      const auth = state.quotes.find(qt => qt.id === action.payload)
      auth.apocryphal = !auth.apocryphal
    }

  }

})


export default QuoteSlice.reducer

export const { createNewQuote, deleteQuote, highlightQuote, toggleQuotes, authenticQuote } = QuoteSlice.actions