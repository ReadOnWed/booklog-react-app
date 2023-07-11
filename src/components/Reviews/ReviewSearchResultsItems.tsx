import React from "react";
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
    reviewSearchResultsItemsKey: string;
    reviewSearchResultsItems: Review[];
    reviewSearchTerms?: ReviewSearchTerms;
}

const DescribeMappingByProps = { // type : 객체([key: string]: value)
    "reviewSearchResultsByReviewTitle" : "제목에 포함되어 있어요",
    "reviewSearchResultsByReviewContent" : "본문에 포함되어 있어요",
    "reviewSearchResultsByBookTitle" : "에 대한 리뷰에요",
    "reviewSearchResultsByReviewWriter" : "이(가) 작성한 리뷰에요"
}

const ReviewSearchResultsItems: React.FC<ReviewSearchResultsItemsProps> = ({reviewSearchResultsItemsKey, reviewSearchResultsItems, reviewSearchTerms}) => {
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

    /*
        as 키워드
            - DescribeMappingByProps라는 객체는 {[key: string]: string} 타입으로 존재한다고 타입 단언.
            - 타입 단언을 함으로써 미리 정의한 해당 타입의 속성과 메서드를 사용할 수 있다.
            - 쉽게 말해, 타입스크립트에게 개발자가 정의한 DescribeMappingByProps라는 type이 존재함을 알려준다.
    */
    const description = (DescribeMappingByProps as {[key: string]: string})[reviewSearchResultsItemsKey];

    const renderReviewSearchResultsItems = (reviews: Review[]) => {
        if(!reviews || !Array.isArray(reviews) || !reviews.length){
            return;
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
        <div className="review__result__box">
            <div className="review__result__item__title">{description}</div>
            {
                reviewSearchResultsItems? (
                    renderReviewSearchResultsItems(reviewSearchResultsItems)
                ) : ( "loading...")
            }

        </div>
    )
}

export default ReviewSearchResultsItems;