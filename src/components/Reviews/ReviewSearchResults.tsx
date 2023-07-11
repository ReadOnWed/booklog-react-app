import React, { useState } from "react";
import ReviewSearchResultsItems from "./ReviewSearchResultsItems";

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
    viewsCount : number;
    commentCount: number;
    book: Book;
};

type ReviewSearchResultProps = {
    reviewSearchResults?: { // type : 객체
      reviewSearchResultsByReviewTitle?: Review[];
      reviewSearchResultsByReviewContent?: Review[];
      reviewSearchResultsByBookTitle?: Review[];
      reviewSearchResultsByReviewWriter?: Review[];
    };
    reviewSearchTerms?: ReviewSearchTerms;
};

type ReviewSearchResults = {
    reviewSearchResultsByReviewTitle?: Review[];
    reviewSearchResultsByReviewContent?: Review[];
    reviewSearchResultsByBookTitle?: Review[];
    reviewSearchResultsByReviewWriter?: Review[];
};

type ReviewSearchTerms = {
    searchKeyword?: string | null;
    bookTitle?: string | null;
    reviewWriter?: string | null;
};

const ReviewSearchResults: React.FC<ReviewSearchResultProps> = ({ reviewSearchResults, reviewSearchTerms }) => {
    return (
        <div className='review__result__wrapper'>
            {
                reviewSearchResults ? (
                    <div className="review__result__list">
                        {/* Object.entries() : 매개변수로 주어진 객체의 각 속성을 [key, value] 형태의 배열로 반환 */}
                        {Object.entries(reviewSearchResults).map(([key, value]) => (
                            <ReviewSearchResultsItems
                                reviewSearchResultsItemsKey={key}
                                reviewSearchResultsItems={value}
                                reviewSearchTerms={reviewSearchTerms}
                            />
                        ))}
                    </div>
                ) : (
                    <img className="error" src="/images/404-error.png"></img>
                )
            }
        </div>
    )
}

export default ReviewSearchResults;