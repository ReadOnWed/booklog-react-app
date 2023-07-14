// App.tsx : React 애플리케이션의 최상위 컴포넌트(애플리케이션의 루트 컴포넌트)
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Common/Header';
import Book from "./pages/Books/BooksPage";
import BookDetail from "./pages/Books/BookDetailPage";
import User from "./pages/Members/index";
import LoginPage from "./pages/Members/LoginPage";
import MyPage from "./pages/Members/Mypage";
import Review from "./pages/Reviews/ReviewsPage";
import ReviewDetail from "./components/Reviews/ReviewDetailPage";
import Payment from "./pages/Payments";
import Message from "./pages/Messages";
import Feed from "./pages/Feeds/Feed";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/books" element={<Book />} />
        <Route path="/bookDetail/:bookId" element={<BookDetail />}/>
        <Route path="/members" element={<User />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/payments"  element={<Payment />} />
        <Route path="/chat"  element={<Message />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/myPage" element={<MyPage/>}/>
        <Route path="/reviewDetail/:reviewId" element={<ReviewDetail/>}/>
      </Routes>
    </BrowserRouter>
  );
}