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

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      <h3>{bookDetails.subTitle}</h3>
      <img src={bookDetails.image} alt={bookDetails.title} />
      <p>{bookDetails.description}</p>
      <p>Author: {bookDetails.author}</p>
      <p>Publisher: {bookDetails.publisher}</p>
      <p>Publication Date: {bookDetails.publicationDate}</p>
      <p>
        <p>
        조회수 : {bookDetails.viewsCount}
        </p>
        <p>
        좋아요 : {bookDetails.likesCount}
        </p>
    </p>

      <h4>Reviews</h4>
      {bookDetails.reviews.map((review) => (
        <div key={review.id}>
          <h5>{review.reviewTitle}</h5>
          <p>{review.reviewContent}</p>
          <p>Rating: {review.rating}</p>
          <p>Created At: {review.createdAt}</p>
          <p>Updated At: {review.updatedAt}</p>
          <p>Likes: {review.likesCount}</p>
          <p>Scraps: {review.scrapsCount}</p>
          <p>Views: {review.viewsCount}</p>
        </div>
      ))}
    </div>
  );
};

export default BookDetailPage;