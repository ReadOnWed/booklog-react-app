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
    recentReview: string;
    author: string;
    publisher: string;
    publicationDate: string;
    totalResults: number;
};

type BookSearchParams = {
    title?: string | null;
    category?: string | null;
    publisher?: string | null;
    author?: string | null;
};

type BookSearchResultsProps = {
    searchResults: Book[];
    bookSearchParams?: BookSearchParams;
};

const BookSearchResults: React.FC<BookSearchResultsProps> = ({ searchResults, bookSearchParams }) => {
    // useNavigate 메소드를 navigate 변수에 저장, navigate()에 path값을 인자로 설정하여 해당 경로로 이동
    const navigate = useNavigate();

    // BookSearchParams 객체를 URL 쿼리 문자열로 변환
    function serializeSearchParams(searchParams: BookSearchParams): string {
        const params = new URLSearchParams();
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value != null) {
            params.append(key, value);
          }
        });
        return params.toString();
    }

    // goToDeatil 변수에서 navigate 변수를 호출 및 파라미터를 (매개변수명: 타입) 로 정의
    const goToDetail = (bookId: string, bookSearchParams?: BookSearchParams) => {
        const serializedSearchParams = bookSearchParams ? serializeSearchParams(bookSearchParams) : '';
        const url = `/bookDetail/${bookId}${bookSearchParams ? `?${serializedSearchParams}` : ''}`;
        navigate(url);
    }
    
    return (
            <div className='book__search__result' >
                {searchResults.map((book) => (
                <div key={book.id} onClick={()=> goToDetail(book.id, bookSearchParams)}> 
                    <p>제목: {book.title}</p>
                    <p>평점: {book.rating}</p>
                    <p>최근리뷰: {book.recentReview}</p>
                    <p>최근리뷰: {book.recentReview}</p>
                    <p>저자: {book.author}</p>
                    <p>출판사: {book.publisher}</p>
                    <p>출판일: {book.publicationDate}</p>
                </div>
                ))}
            </div>

    );
  };
  
  export default BookSearchResults;