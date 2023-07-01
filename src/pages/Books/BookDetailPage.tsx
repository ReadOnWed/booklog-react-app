import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import './Books.css'
import { getBookDetailsSearchByBookId } from '../../api/bookApi';

type Review = {
  id: string;
  reviewWriter: string;
  reviewTitle: string;
  reviewContent: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  scrapsCount: number;
  viewsCount: number;
};

type BookDetails = {
  id: string;
  title: string;
  subTitle: string;
  image: string;
  private: number;
  description: string;
  mainCategory: string;
  subCategory: string;
  viewsCount: number;
  likesCount: number;
  rating: number;
  totalReviews: number;
  recentReview: string;
  author: string;
  publisher: string;
  publicationDate: string;
  reviews: Review[];
};

const BookDetailPage: React.FC = () => {
  // 페이지 이동시 연산이 필요한 경우 useNavigate 훅을 사용
  const navigate = useNavigate();

  // 현재 경로 정보를 객체 형태로 가져오기 위한 useLoaction 훅
  // React Router와 상호작용하여 동적 라우팅 기능을 구현한다
  /* 아래와 같은 상황에 사용, 
      - 현재 경로 정보를 확인하여 조건부 랜더링을 수행
      - 현재 경로 정보를 기반으로 특정 동작을 수행(페이지 전환, 데이터 요청 등)
      - 현재 경로 정보를 다른 컴포넌트로 전달
  */
  const location = useLocation();

  /* useParams 훅을 사용하며 URL 경로의 매개변수 값(bookId)을 추출 */
  const { bookId } = useParams();
  const [bookDetails, setBookDetailsSearch] = useState<BookDetails>();

  useEffect(() => {

    // 도서 검색을 통해 상세페이지로 들어왔다면 경로(검색어) 저장
    const handlePopState = () => {
      navigate('/books' + location.search);
    };

    const fetchBookDetails = async () => {
      const bookDetails = await getBookDetailsSearchByBookId(bookId);
      setBookDetailsSearch(bookDetails || undefined);
    };

    // 뒤로가기 수행시 이전 페이지로 가기 위해 'popState' 이벤트를 사용하여 이벤트 핸들러 등록
    window.addEventListener('popstate', handlePopState);

    fetchBookDetails();

    // clean-up 메소드 : 컴포넌트가 마운트 해제될 떄(= 컴포넌트가 소멸될 때), 등록된 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [bookId]); // useEffect 의존성배열에 bookId를 추가함으로써, 해당 값이 바뀔때마다 재랜더링

  if (!bookDetails) {
    return <div>Loading...</div>;
  };

  const goToPaymentsBuy = (bookId: string) => {
    const url = `/buy/${bookId}`;
    navigate(url);
  }

  const goToPaymentsSell = (bookId: string) => {
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
      stars.push(<img key={i} className='star__icon' src='/images/star.png' alt='star' />);
    }

    if (starRemainder >= minRatingForHalfStar && starRemainder <= maxRatingForHalfStar) {
      stars.push(<img key={starCount} className='star__icon' src='/images/star_half.png' alt='star' />);
    }

    const emptyStarCount = starTotal - starCount
      - (starRemainder >= minRatingForHalfStar && starRemainder <= maxRatingForHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStarCount; i++) {
      stars.push(<img key={starCount + i + 1} className='star__icon' src='/images/star_empty.png' alt='star' />);
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

  return (
    <div className='book__detail__wrapper'>
      <div className='book__detail__container'>
        <div className='title__container'>
          <p className='title'>{bookDetails.title}</p>
          <p className='sub__title'>{bookDetails.subTitle}</p>
        </div>
        <div className='book__information__container'>
          <img className='book__cover' src={`/images/booksCover/${bookId}.jpeg`} alt={bookDetails.title} />
          <div className='book__information__item'>
            <div className='information'>
              <p className='label'>분류</p>
              <p className='value'>{bookDetails.mainCategory}</p>
            </div>
            <div className='information'>
              <p className='label'>평점</p>
              <p className='value'>{renderStars(bookDetails.rating)}</p>
            </div>
            <div className='information'>
              <p className='label'>리뷰</p>
              <p className='value'>{bookDetails.totalReviews} 건</p>
            </div>
            <div className='information'>
              <p className='label'>최근 리뷰</p>
              <p className='value'>{convertDateFormat(bookDetails.recentReview)}</p>
            </div>
            <div className='information'>
              <p className='label'>저자</p>
              <p className='value'>{bookDetails.author}</p>
            </div>
            <div className='information'>
              <p className='label'>출판일</p>
              <p className='value'>{convertDateFormat(bookDetails.publicationDate)}</p>
            </div>
            <div className='information'>
              <p className='label'>출판사</p>
              <p className='value'>{bookDetails.publisher}</p>
            </div>
          </div>
        </div>
        <div className='book__description__container'>
          <p className='description__title'>책 소개</p>
          <p className='description'>{bookDetails.description}</p>
        </div>

        <div className='priamry__button__list'>
          <div className='primary__button__like'>
            <img className='like__icon' src='/images/book_like.png' alt='book_like' />
            {bookDetails.likesCount}
            </div>
          <div className='primary__button' onClick={() => goToPaymentsSell(bookDetails.id)}>판매하기</div>
          <div className='primary__button' onClick={() => goToPaymentsBuy(bookDetails.id)}>구매하기</div>
        </div>
      </div>

      <div className='review__container'>
        <h4 className='review__wrapper'>Reviews</h4>
        {bookDetails.reviews.map((review) => (
          <div key={review.id}>
            <h5 className='review__title'>{review.reviewTitle}</h5>
            <p className='review__content'>{review.reviewContent}</p>
            <p className='rating'>Rating: {review.rating}</p>
            <p className='date'>Created At: {review.createdAt}</p>
            <p className='date'>Updated At: {review.updatedAt}</p>
            <p className='likes__count'>Likes: {review.likesCount}</p>
            <p className='scraps__count'>Scraps: {review.scrapsCount}</p>
            <p className='views__count'>Views: {review.viewsCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookDetailPage;