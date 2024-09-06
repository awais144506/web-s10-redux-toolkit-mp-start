import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { highlightQuote, authenticQuote, deleteQuote, toggleQuotes } from '../state/quotesSlice'
export default function Quotes() {
  const dispatch = useDispatch()
  const quotes = useSelector(st => st.quotes.quotes)
  const displayAllQuotes = useSelector(st => st.quotes.displayAllQuotes) // ✨ `displayAllQuotes` must come from the Redux store
  const highlightedQuote = useSelector(st => st.quotes.highlightedQuote) // ✨ `highlightedQuote` must come from the Redux store

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {
          quotes
            ?.filter(qt => {
              return displayAllQuotes || !qt.apocryphal
            })
            .map(qt => (
              <div
                key={qt.id}
                className={`quote${qt.apocryphal ? " fake" : ''}${highlightedQuote === qt.id ? " highlight" : ''}`}
              >
                <div>{qt.quoteText}</div>
                <div>{qt.authorName}</div>
                <div className="quote-buttons">
                  <button onClick={() => {
                    const action = deleteQuote(qt.id)
                    dispatch(action)
                  }}>DELETE</button>
                  <button onClick={() => {
                    const action = highlightQuote(qt.id)
                    dispatch(action)
                  }}>HIGHLIGHT</button>
                  <button onClick={() => {
                    const action = authenticQuote(qt.id)
                    dispatch(action)
                  }}>FAKE</button>
                </div>
              </div>
            ))
        }
        {
          !quotes?.length && "No quotes here! Go write some."
        }
      </div>
      {!!quotes?.length && <button onClick={() => {
        const action = toggleQuotes()
        dispatch(action)
      }}>
        {displayAllQuotes ? 'HIDE' : 'SHOW'} FAKE QUOTES
      </button>}
    </div>
  )
}
