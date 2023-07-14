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
    viewsCount: number;
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

const DescribeMappingByProps = { // type : 객체([key: string]: value)
    "reviewSearchResultsByReviewTitle": "제목에 포함되어 있어요",
    "reviewSearchResultsByReviewContent": "본문에 포함되어 있어요",
    "reviewSearchResultsByBookTitle": "에 대한 리뷰에요",
    "reviewSearchResultsByReviewWriter": "님이 작성한 리뷰에요"
}

const ReviewSearchResults: React.FC<ReviewSearchResultProps> = ({ reviewSearchResults, reviewSearchTerms }) => {
    /*
        as 키워드
            - DescribeMappingByProps라는 객체는 {[key: string]: string} 타입으로 존재한다고 타입 단언.
            - 타입 단언을 함으로써 미리 정의한 해당 타입의 속성과 메서드를 사용할 수 있다.
            - 쉽게 말해, 타입스크립트에게 개발자가 정의한 DescribeMappingByProps라는 type이 존재함을 알려준다.
    */
    const description = (itemKey: string, reviewSearchTerms?: ReviewSearchTerms) => {
        if (!reviewSearchTerms) {
            return;
        }

        let description = "";
        if (itemKey === "reviewSearchResultsByBookTitle" && reviewSearchTerms.bookTitle) {
            description = '"' + reviewSearchTerms.bookTitle + '" ';
        }
        if (itemKey === "reviewSearchResultsByReviewWriter" && reviewSearchTerms.reviewWriter) {
            description = reviewSearchTerms.reviewWriter;
        }
        return description + (DescribeMappingByProps as { [key: string]: string })[itemKey];
    }

    return (
        reviewSearchResults ? (
            <div className="review__result__wrapper">
                {/* Object.entries() : 매개변수로 주어진 객체의 각 속성을 [key, value] 형태의 배열로 반환 */}
                {Object.entries(reviewSearchResults).map(([key, value]) => (
                    <div className="review__result__list">
                        <div className="review__result__item__title">
                            {description(key, reviewSearchTerms)}
                        </div>
                        <ReviewSearchResultsItems
                            reviewSearchResultsItems={value}
                            reviewSearchTerms={reviewSearchTerms}
                        />
                    </div>
                ))}
            </div>
        ) : (
            <img className="error" src="/images/404-error.png"></img>
        )
    )
}

export default ReviewSearchResults;