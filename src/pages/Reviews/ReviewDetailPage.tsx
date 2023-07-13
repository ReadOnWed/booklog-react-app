import React from "react";
import { useParams } from "react-router-dom";
import { getReviewDetailsByReviewId } from "../../api/reviewApi";

type Book = {
    bookId: string;
    subCategory: string;
    author: string;
    publisher: string;
    title: string;
}

type ReviewDetail = {
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

const ReveiwDetailPage: React.FC = () => {
    /* useParams 훅을 사용하여 URL 경로의 매개변수 값 추출 */
    const { reviewId } = useParams();

    const reviewDetail = getReviewDetailsByReviewId(reviewId);

    return (
        <div>{reviewId}</div>
    )

}

export default ReveiwDetailPage;