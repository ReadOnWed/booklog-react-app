import React from 'react';
/* 페이지 이동을 할 수 있는 useNavigate 훅 import

- 페이지 이동간 추가로 연산(혹은 조건 등)이 필요한 경우 useNavigate 훅 사용(= 동적 라우팅)
- 다른 연산 없이 클릭을 통한 단순 이동일 경우 Link 컴포넌트를 사용()= 정적 라우팅)

*/
import { useNavigate } from "react-router-dom";
import './Book.css';

type Book = {
  id: string;
  title: string;
  rating: number;
  totalReviews: number;
  recentReview: string;
  author: string;
  publisher: string;
  publicationDate: string;
  totalResults: number;
};

// 여러개의 props를 전달받기 위한 interface 정의
type DefaultResultsBookProps = {
  topRatedBooks: Book[];
  topReviewedBooksInMonth: Book[];
  recentReviewBooks: Book[];
}

type describeMapping = {
  [key: string]: string;
};
const descirbeMapping: describeMapping = {
  "topRatedBooks" : "평점이 높아요",
  "topReviewedBooksInMonth" : "한달간 리뷰가 많아요",
  "recentReviewBooks": "최근 리뷰가 등록됐어요"
};


const BookSearchDefaultResults: React.FC<DefaultResultsBookProps> = ({ topRatedBooks, topReviewedBooksInMonth, recentReviewBooks }) => {
  // useNavigate 메소드를 navigate 변수에 저장, navigate()에 path값을 인자로 설정하여 해당 경로로 이동
  const navigate = useNavigate();

  const renderBooks = (books: Book[]) => {
    // goToDeatil 변수에서 navigate 변수를 호출 및 파라미터를 (매개변수명: 타입) 로 정의
    const goToDetail = (bookId: string) => {
      navigate(`/bookDetail/${bookId}`);
    }
    return books.map((book) => (
      <div key={book.id} className='search__default__item' onClick={()=> goToDetail(book.id)}> 
        <p>제목: {book.title}</p>
        <p>평점: {book.rating}</p>
        <p>리뷰: {book.totalReviews}건</p>
        <p>최근리뷰: {book.recentReview}</p>
        <p>저자: {book.author}</p>
        <p>출판사: {book.publisher}</p>
        <p>출판일: {book.publicationDate}</p>
        <p>총 조회 건수: {book.totalResults}</p>
      </div>
    ));
  };

  return (
    <div className='book__search__default'>
      <div className='search__default__container'>
        <h1 className='title'>{descirbeMapping['topRatedBooks']}</h1>
        <div className='search__default__list'>
          {renderBooks(topRatedBooks)}
        </div>

        <h1 className='title'>{descirbeMapping['topReviewedBooksInMonth']}</h1>
        <div className='search__default__list'>
          {renderBooks(topReviewedBooksInMonth)}
        </div>

        <h1 className='title'>{descirbeMapping['recentReviewBooks']}</h1>
        <div className='search__default__list'>
          {renderBooks(recentReviewBooks)}
        </div>
      </div>
    </div>
  );
};
export default BookSearchDefaultResults;