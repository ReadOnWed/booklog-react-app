import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import './Book.css'

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

type ReviewListProps = {
    reviews: Review[];
    bookId: string;
    bookTitle: string;
    userId: string;
}
function convertDateFormat(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일`;
}

function renderReivewsItem(reviews: Review[], goToReivewDetailByReviewId: (reviewId: string) => void): React.ReactNode[] {
    return reviews.map((review) => (
      <div key={review.id}>
        <div className='review__item' onClick={() => goToReivewDetailByReviewId(review.id)}>
            <p className='review__title'>{review.reviewTitle}</p>
            <div className='review__information'>
                <img className='review__information__icon' src={`/images/review_like.png`}></img>
                <p className='review__information__item'>{review.likesCount}</p>
            </div>
            <div className='review__information'>
                <img className='review__information__icon' src={`/images/review_scrap.png`}></img>
                <p className='review__information__item'>{review.scrapsCount}</p>
            </div>
            <div className='review__information__writer'>
                <img className='review__information__icon' src={`/images/review_writer.png`}></img>
                <p className='review__information__item'>{review.reviewWriter}</p>
            </div>
            <p className='review__information__date'>{convertDateFormat(review.createdAt)}</p>
        </div>
      </div>
    ));
}

const ReviewListByBookId: React.FC<ReviewListProps> = ({ reviews, bookId, bookTitle, userId }) => {
    const navigate = useNavigate();

    const goToReviewListByBookId = (bookTitle: string) => {
        const url = `/reviews?bookTitle=${bookTitle}`;
        navigate(url);
    }

    const goToReviewWriteByBookIdAndUserId = (bookId: string, userId : string) => {
        const url = `/review/write/${userId}?bookId=${bookId}`;
        navigate(url);
    }

    const goToReivewDetailByReviewId = (reviewId: string) => {
        const url = `/reviewDetail/${reviewId}`;
        navigate(url);
    }
    
    return (
        <div className='review__wrapper'>
            <div className='priamry__button__list'>
                <div className='primary__button' onClick={() => goToReviewListByBookId(bookTitle)}>
                    <img className='primary__button__icon' src={`/images/review_list.png`} />
                    <p className='primary__button__item'>전체 리뷰</p>
                </div>
                <div className='primary__button' onClick={() => goToReviewWriteByBookIdAndUserId(bookId, userId)}>
                    <img className='primary__button__icon' src={`/images/review_write.png`} />
                    <p className='primary__button__item'>리뷰 작성</p>
                </div>
            </div>
            <div className='review__container'>
                <div>{renderReivewsItem(reviews, goToReivewDetailByReviewId)}</div>
            </div>
        </div> 
    );
};

export default ReviewListByBookId;