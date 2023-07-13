import React, { useState } from "react";
import ReviewSearchResults from "../../components/Reviews/ReviewSearchResults";
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
    const [feedReviews, setFeedReiews] = useState();

    const feedReviewsByUserId = getFeedReviewsByUserId('1234');
    return (
        <div>
            feed입니다.
            <ReviewSearchResults
                reviewSearchResults={{
                }}
            />
        </div>
    )
}

export default Feed;