import React, { useEffect, useState } from "react";
import ReviewSearchResultsItems from "../../components/Reviews/ReviewSearchResultsItems";
import { getFeedReviewsByUserId } from '../../api/reviewApi';

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

const Feed: React.FC = () => {
    const [feedReviews, setFeedReiews] = useState<Review[]>([]);
    let userId = "1234";

    const fetchData = async () => {
        const feedReviewsByUserId = await getFeedReviewsByUserId(userId);
        setFeedReiews(feedReviewsByUserId);
    }

    useEffect(() => {
        fetchData();
    }, []) // 의존성배별은 빈 배열([])로 선언하여 최초 1회만 페이지 랜더링

    return (
        <div>
            feed입니다.
            <ReviewSearchResultsItems
                reviewSearchResultsItems={feedReviews}
            />
        </div>
    )
}

export default Feed;