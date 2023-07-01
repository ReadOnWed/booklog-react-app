import React from 'react';
/* 페이지 이동을 할 수 있는 useNavigate 훅 import

- 페이지 이동간 추가로 연산(혹은 조건 등)이 필요한 경우 useNavigate 훅 사용(= 동적 라우팅)
- 다른 연산 없이 클릭을 통한 단순 이동일 경우 Link 컴포넌트를 사용()= 정적 라우팅)

*/
import { useNavigate } from 'react-router-dom';
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
  'topRatedBooks': '평점이 높아요',
  'topReviewedBooksInMonth': '한달간 리뷰가 많아요',
  'recentReviewBooks': '최근 리뷰가 등록됐어요'
};


const BookSearchDefaultResults: React.FC<DefaultResultsBookProps> = ({ topRatedBooks, topReviewedBooksInMonth, recentReviewBooks }) => {
  // useNavigate 메소드를 navigate 변수에 저장, navigate()에 path값을 인자로 설정하여 해당 경로로 이동
  const navigate = useNavigate();

  const renderBooks = (books: Book[]) => {
    // goToDeatil 변수에서 navigate 변수를 호출 및 파라미터를 (매개변수명: 타입) 로 정의
    const goToDetail = (bookId: string) => {
      navigate(`/bookDetail/${bookId}`);
    }

    function renderStars(rating: number){
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
    
    return books.map((book) => (
      <div key={book.id} className='search__default__item' onClick={() => goToDetail(book.id)}>
        <img className='book__cover' src={`images/booksCover/${book.id}.jpeg`}></img>
        <div className='default__item__content'>
          <div className='content'>
            <p className='label'>제목:</p>
            <p className='value'>{book.title}</p>
          </div>
          <div className='content'>
            <p className='label'>평점:</p>
            {/* 평점 수만큼 별(star) 이미지를 렌더링 */}
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
    ));
  };

  return (
    <div className='book__search__default'>
      <div className='search__default__container'>
        <div className='search__default__list'>
          <div className='title__wrapper'>
            <img className='title__icon' src={`images/topRatedBooks.png`}></img>
            <h1 className='title'>{descirbeMapping['topRatedBooks']}</h1>
          </div>
          <div className='search__default__item__wrapper'>{renderBooks(topRatedBooks)}</div>
        </div>

        <div className='search__default__list'>
          <div className='title__wrapper'>
            <img className='title__icon' src={`images/topReviewedBooksInMonth.png`}></img>
            <h1 className='title'>{descirbeMapping['topReviewedBooksInMonth']}</h1>
          </div>
          <div className='search__default__item__wrapper'>{renderBooks(topReviewedBooksInMonth)}</div>
        </div>

        <div className='search__default__list'>
          <div className='title__wrapper'>
            <img className='title__icon' src={`images/recentReviewBooks.png`}></img>
            <h1 className='title'>{descirbeMapping['recentReviewBooks']}</h1>
          </div>
          <div className='search__default__item__wrapper'>{renderBooks(recentReviewBooks)}</div>
        </div>
      </div>
    </div>
  );
};
export default BookSearchDefaultResults;