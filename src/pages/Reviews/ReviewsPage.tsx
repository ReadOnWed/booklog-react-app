import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ReviewSearchForm from '../../components/Reviews/ReviewSearchForm';
import ReviewSearchResults from '../../components/Reviews/ReviewSearchResults';
import ReviewSearchDefault from '../../components/Reviews/ReviewSearchDefault';

import {
    getRecommendedReviews, getReviewSearchResultsByReviewTitle, getReviewSearchResultsByReviewContent,
    getReviewSearchResultsByBookTitle, getReviewSearchResultsByReviewWriter
} from '../../api/reviewApi';

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
    commentCount: number
    book: Book;
};

type ReviewSearchTerms = {
    searchKeyword?: string | null;
    bookTitle?: string | null;
    reviewWriter?: string | null;
};

const ReviewsPage: React.FC = () => {
    /* 화면전환시, 단순 버튼 클릭이 아닌 연산(url 전달 등)이 필요할 경우엔 useNaviagte 훅을 사용 */
    const navigate = useNavigate();

    const [showSearchResults, setShowSearchResults] = useState(false);
    const [reviewSearchResultsByReviewTitle, setReviewSearchResultsByReviewTitle] = useState<Review[]>([]);
    const [reviewSearchResultsByReviewContent, setReviewSearchResultsByReviewContent] = useState<Review[]>([]);
    const [reviewSearchResultsByBookTitle, setReviewSearchResultsByBookTitle] = useState<Review[]>([]);
    const [reviewSearchResultsByReviewWriter, setReviewSearchResultsByReviewWriter] = useState<Review[]>([]);
    const [recommendedReviews, setRecommendedReviews] = useState<Review[]>([]);
    const [reviewSearchTerms, setReviewSearchTerms] = useState<ReviewSearchTerms>();

    useEffect(() => {
        const fetchData = async () => {

            // URL 경로에서 검색어가 있는 경우(= 상세페이지에서 검색결과 페이지로 돌아오는 경우), 각 검색 조건을 추출
            const searchParamsByUrlPath = new URLSearchParams(location.search);
            const searchKeyword = searchParamsByUrlPath.get('keyword');
            const bookTitle = searchParamsByUrlPath.get('bookTitle');
            const reviewWriter = searchParamsByUrlPath.get('writer');

            if (searchKeyword || bookTitle || reviewWriter) {
                // 해당 검색 조건별 리뷰 검색 api 요청
                fetchReviewSearchResults(searchKeyword, bookTitle, reviewWriter);

                // 검색어 조건을 reviewSearchTerms 상태에 저장 (ReveiwDetailPage로 넘어갈때 검색어 정보를 저장하기 위함)
                const previousReviewSearchTerms: ReviewSearchTerms = {
                    searchKeyword: searchKeyword || null,
                    bookTitle: bookTitle || null,
                    reviewWriter: reviewWriter || null
                };
                setReviewSearchTerms(previousReviewSearchTerms);
                setShowSearchResults(true);
            }
            else {
                // 추천 리뷰 조회 API
                const recommendedReviews = await getRecommendedReviews();
                setRecommendedReviews(recommendedReviews);
            }
        };

        fetchData();
    }, []); // 의존성 배열, 초기에만 실행하므로 빈 배열([])로 선언

    const fetchReviewSearchResults = async (
        searchKeyword?: String | null,
        bookTitle?: String | null,
        reviewWriter?: String | null) => {
            clearReviewSearchResults();

            if (searchKeyword) {
                const reviewSearchResultsByReviewTitle = await getReviewSearchResultsByReviewTitle(searchKeyword);
                const reviewSearchResultsByReviewContent = await getReviewSearchResultsByReviewContent(searchKeyword);
                
                setReviewSearchResultsByReviewTitle(reviewSearchResultsByReviewTitle);
                setReviewSearchResultsByReviewContent(reviewSearchResultsByReviewContent);
            }
            if (bookTitle) {
                const reviewSearchResultsByBookTitle = await getReviewSearchResultsByBookTitle(bookTitle);
                setReviewSearchResultsByBookTitle(reviewSearchResultsByBookTitle);
            }
            if (reviewWriter) {
                const reviewSearchResultsByReveiwWriter = await getReviewSearchResultsByReviewWriter(reviewWriter)
                setReviewSearchResultsByReviewWriter(reviewSearchResultsByReveiwWriter);
            }
    };

    const clearReviewSearchResults = () => {
        setReviewSearchResultsByReviewTitle([]);
        setReviewSearchResultsByReviewContent([]);
        setReviewSearchResultsByBookTitle([]);
        setReviewSearchResultsByReviewWriter([]);
    }

    const handleSearch = (reviewSearchTerms: ReviewSearchTerms) => {
        const fetchData = async () => {
            fetchReviewSearchResults(reviewSearchTerms.searchKeyword, reviewSearchTerms.bookTitle, reviewSearchTerms.reviewWriter);
            setShowSearchResults(true);

            // previousReviewSearchTerms : 검색 결과 화면 전환시, 기존 검색어를 저장하기 위한 상태
            const previousReviewSearchTerms: ReviewSearchTerms = {
                searchKeyword: reviewSearchTerms.searchKeyword || null,
                bookTitle: reviewSearchTerms.bookTitle || null,
                reviewWriter: reviewSearchTerms.reviewWriter || null
            };
            setReviewSearchTerms(previousReviewSearchTerms);

            // useNavigate 훅을 통해 검색어를 URL 경로에 추가(뒤로가기시 동일한 검색결과를 화면에 노출해주기 위함)
            const searchTermsByUrlPath = new URLSearchParams();
            if (reviewSearchTerms.searchKeyword) {
                searchTermsByUrlPath.set('keyword', reviewSearchTerms.searchKeyword);
            }
            if (reviewSearchTerms.bookTitle) {
                searchTermsByUrlPath.set('bookTitle', reviewSearchTerms.bookTitle);
            }
            if (reviewSearchTerms.reviewWriter) {
                searchTermsByUrlPath.set('writer', reviewSearchTerms.reviewWriter);
            }
            navigate(`/reviews?${searchTermsByUrlPath.toString()}`);
        };

        fetchData();
    };

    return (
        <div className='reivew__wrapper'>
            <ReviewSearchForm
                onSearch={handleSearch}
                reviewSearchTerms={reviewSearchTerms}
            />
            {showSearchResults ? (
                <ReviewSearchResults
                    reviewSearchResults={{
                        reviewSearchResultsByReviewTitle,
                        reviewSearchResultsByReviewContent,
                        reviewSearchResultsByBookTitle,
                        reviewSearchResultsByReviewWriter,
                    }}
                    reviewSearchTerms={reviewSearchTerms}
                />
            ) : (
                <ReviewSearchDefault
                    recommendedReviews={recommendedReviews}
                />
            )}
        </div>
    );
}
export default ReviewsPage