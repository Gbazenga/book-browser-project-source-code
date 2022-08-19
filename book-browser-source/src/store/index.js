import { createSlice, configureStore } from "@reduxjs/toolkit"

const counterSlice = createSlice({
    name: "counter",
    initialState: {counter: 0, hasWishlist: false, wishList: [], books: [], highlightedBook: {}},
    reducers: {
        increment(state, action) {
            state.counter++;
            state.hasWishlist = true;
            state.wishList.unshift(action.payload);
        },
        decrement(state, action) {
            state.counter--;
            if(state.counter === 0){
                state.hasWishlist = false;
            }

            const filtered = state.wishList.filter((book) => {
                return (book.title !== action.payload)
            })

            state.wishList = filtered;
        },
        getBookInfo(state, action) {
            state.highlightedBook = state.books.filter((book) => {
                return (book.title === action.payload)
            })

            state.highlightedBook = state.highlightedBook[0]
        },
        populateBookList(state, action){
            state.books = action.payload
        }
    }
})

const store = configureStore({
    reducer: counterSlice.reducer
});

export const counterActions = counterSlice.actions;
export default store;