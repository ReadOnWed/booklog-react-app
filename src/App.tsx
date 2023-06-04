// App.tsx : React 애플리케이션의 최상위 컴포넌트(애플리케이션의 루트 컴포넌트)
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Header from './components/Common/Header';
import Book from "./pages/Books";
import User from "./pages/Members/index";
import LoginPage from "./pages/Members/LoginPage";
import MyPage from "./pages/Members/Mypage";
import Review from "./pages/Reviews";
import Payment from "./pages/Payments";
import Message from "./pages/Messages";
import Feed from "./pages/Feed";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/feed" element={<Feed />}></Route>
        <Route path="/books" element={<Book />} />
        <Route path="/members" element={<User />} />
        <Route path="/reviews" element={<Review />} />
        <Route path="/payments"  element={<Payment />} />
        <Route path="/chat"  element={<Message />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/myPage" element={<MyPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}