import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Author from "./routes/authors"
import AuthorBookList from "./routes/authorBookList"
import Genres from "./routes/genres"
import Books from "./routes/books"
import Wishlist from "./routes/wishlist"
import BookInfo from "./routes/bookInfo"
import GenreInfo from "./routes/genresInfo"

import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/book-browser-project/" element={<App />} />
          <Route path="/book-browser-project/authors" element={<Author />} />
          <Route path="/book-browser-project/authors/:authorList" element={<AuthorBookList />} />
          <Route path="/book-browser-project/genres" element={<Genres />} />
          <Route path="/book-browser-project/genres/:genreInfo" exact element={<GenreInfo />} />
          <Route path="/book-browser-project/books" element={<Books />} />
          <Route path="/book-browser-project/books/:bookName" exact element={<BookInfo />} />
          <Route path="/book-browser-project/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
