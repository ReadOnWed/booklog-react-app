import React from "react";
import { useNavigate } from 'react-router-dom';

type Book = {
    bookId: string;
    subCategory: string;
    author: string;
    publisher: string;
    title: string;
}

type Review = {
    id: string;
    userId: string;
    reviewWriter: number;
    reviewTitle: number;
    reviewContent: string;
    rating: number;
    createdAt: string;
    updatedAt: string;
    readPeriod: number;
    likesCount: number;
    scrapsCount: number;
    viewsCount: number;
    commentCount: number;
    book: Book;
};

type ReviewSearchDefaultProps = {
    recommendedReviews: Review[];
};

const ReviewSearchDefault: React.FC<ReviewSearchDefaultProps> = ({ recommendedReviews }) => {
    const navigate = useNavigate();

    const renderReviews = (reviews: Review[]) => {
        if(!reviews){
            return;
        }
        
        const goToDetail = (reviewId: string) => {
            navigate(`/reviewDetail/${reviewId}`);
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

        return reviews.map((review) => (
            <div key={review.id} className='search__default__item' onClick={() => goToDetail(review.id)}>
                <div className='default__item__content'>
                    <div className='content'>
                        <p className='review__title'>{review.reviewTitle}</p>
                    </div>
                    <div className='content'>
                        <p className='review__content'>{review.reviewContent}</p>
                    </div>
                    <div className='content'>
                        <p className='label'>평점:</p>
                        {/* 평점 수만큼 별(star) 이미지를 렌더링 */}
                        <p className='value'>{renderStars(review.rating)}</p>
                    </div>
                    <div className='content'>
                        <p className='label'>리뷰 작성일:</p>
                        <p className='value'>{convertDateFormat(review.createdAt)}</p>
                    </div>
                    <div className='content'>
                        <p className='label'>작성자:</p>
                        <p className='value'>{review.reviewWriter}</p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className="review__default__wrapper">
            <div className="review__default__title">
                <img className="default__logo" src={`images/recommended_review.jpeg`}></img>
                <div className="title">오늘의 추천 리뷰</div>
            </div>
            <div className="review__default__list">
                {renderReviews(recommendedReviews)}
            </div>
        </div>
    )
}

export default ReviewSearchDefault;
