import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

type ReviewSearchTerms = {
    searchKeyword?: string | null;
    bookTitle?: string | null;
    reviewWriter?: string | null;
};


type ReviewSearchResultsItemsProps = {
    reviewSearchResultsItems: Review[];
    reviewSearchTerms?: ReviewSearchTerms;
}

const ReviewSearchResultsItems: React.FC<ReviewSearchResultsItemsProps> = ({reviewSearchResultsItems, reviewSearchTerms}) => {
    const navigate = useNavigate();

    const serializeSearchParams = (searchTerms: ReviewSearchTerms) => {
        const params = new URLSearchParams();
        Object.entries(searchTerms).forEach(([key, value]) => {
            if (value != null) {
                params.append(key, value);
            }
        });
        return params.toString();
    }

    const goToDetail = (reviewId: string) => {
        const serializedSearchParams =  reviewSearchTerms ? serializeSearchParams(reviewSearchTerms) : '';
        navigate(`/reviewDetail/${reviewId}${reviewSearchTerms ? `?${serializedSearchParams}` : ''}`);
    }

    const renderReviewSearchResultsItems = (reviews: Review[]) => {
        if(!reviews || !Array.isArray(reviews) || !reviews.length){
            return <div></div>
        }

        return(
            <div className="review__result__item">
                {reviews.map((review) => {
                    return (
                        <div className={review.id} onClick={() => goToDetail(review.id)}>
                            <div>{review.reviewTitle}</div>
                            <div>{review.reviewContent}</div>
                            <div>{review.rating}</div>
                            <div>{review.reviewWriter}</div>
                            <div>{review.likesCount}</div>
                            <div>{review.scrapsCount}</div>
                            <div>{review.viewsCount}</div>
                            <div>{review.commentCount}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        reviewSearchResultsItems? (
            renderReviewSearchResultsItems(reviewSearchResultsItems)
            ) : (<div> loading... </div>)
    )
}

export default ReviewSearchResultsItems;