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
    likesCount: number;
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

    const goToPaymentsBuy = (bookId: string) => {
        const serializedSearchParams = bookSearchParams ? serializeSearchParams(bookSearchParams) : '';
        const url = `/buy/${bookId}`;
        navigate(url);
    }

    const goToPaymentsSell = (bookId: string) => {
        const serializedSearchParams = bookSearchParams ? serializeSearchParams(bookSearchParams) : '';
        const url = `/sell/${bookId}`;
        navigate(url);
    }
    
    function renderStars(rating: number) {
        const starTotal = 5;
        const starCount = Math.floor(rating / 10); // 평점을 10으로 나눈 몫
        const starRemainder = rating % 10; // 평점을 10으로 나눈 나머지

        /* 일의자리가 5 이상 9 이하일 경우 star_half(반쪽자리 별 이미지)를 노출 */
        const minRatingForHalfStar = 5;
        const maxRatingForHalfStar = 9;

        const stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(<img key={i} className='star__icon' src='images/star.png' alt='star' />);
        }

        if (starRemainder >= minRatingForHalfStar && starRemainder <= maxRatingForHalfStar) {
            stars.push(<img key={starCount} className='star__icon' src='images/star_half.png' alt='star' />);
        }

        const emptyStarCount = starTotal - starCount
            - (starRemainder >= minRatingForHalfStar && starRemainder <= maxRatingForHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStarCount; i++) {
            stars.push(<img key={starCount + i + 1} className='star__icon' src='images/star_empty.png' alt='star' />);
        }

        return stars;
    }

    function convertDateFormat(dateString: string) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}년 ${month}월 ${day}일`;
    }

    function renderBookItems() {
        if (searchResults.length === 0) {
            return (
                <div className='no__result__container'>
                    <img className='no__results__logo' src={`images/booksCover/no__results__logo.jpeg`} alt='no results' />
                    <p className='no__results'>검색결과가 없습니다.</p>
                </div>
            );
        }

        return searchResults.map((book) => (
            <div key={book.id} className='search__result__item'>
                <div onClick={() => goToDetail(book.id, bookSearchParams)}>
                    <img className='book__cover' src={`images/booksCover/${book.id}.jpeg`} alt='book cover' />
                    <div className='result__item__content'>
                        <div className='content'>
                            <p className='label'>제목:</p>
                            <p className='value'>{book.title}</p>
                        </div>
                        <div className='content'>
                            <p className='label'>평점:</p>
                            <p className='value'>{renderStars(book.rating)}</p>
                        </div>
                        <div className='content'>
                            <p className='label'>리뷰:</p>
                            <p className='value'>{book.totalReviews}건</p>
                        </div>
                        <div className='content'>
                            <p className='label'>최근리뷰:</p>
                            <p className='value'>{convertDateFormat(book.recentReview)}</p>
                        </div>
                        <div className='content'>
                            <p className='label'>저자:</p>
                            <p className='value'>{book.author}</p>
                        </div>
                        <div className='content'>
                            <p className='label'>출판사:</p>
                            <p className='value'>{book.publisher}</p>
                        </div>
                        <div className='content'>
                            <p className='label'>출판일:</p>
                            <p className='value'>{convertDateFormat(book.publicationDate)}</p>
                        </div>
                    </div>
                </div>
                <div className='priamry__button__list'>
                    <div className='primary__button__like'>
                        <img className='like__icon' src='/images/book_like.png' alt='book_like' />
                        {book.likesCount}
                    </div>                    
                    <div className='primary__button' onClick={() => goToPaymentsSell(book.id)}>판매하기</div>
                    <div className='primary__button' onClick={() => goToPaymentsBuy(book.id)}>구매하기</div>
                </div>
            </div>
        ));
    }

    return (
        <div className='search__result__wrapper>'>
            <h1 className='total__count'>총 {searchResults[0].totalResults} 건이 검색되었습니다.</h1>
            <div className='search__result__container'>{renderBookItems()}</div>
        </div>
    );
};

export default BookSearchResults;