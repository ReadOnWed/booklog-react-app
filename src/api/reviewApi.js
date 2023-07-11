import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 리뷰 제목으로 검색 API
export const getReviewSearchResultsByReviewTitle = async(searchKeyword) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/search/review-title', {
            params: {searchKeyword: searchKeyword}
            });
        return response.data;
    } catch (error){
        console.error('Fail getReviewSearchResultsByReviewTitle API call: ',error);
        return null;
    }
};

// 리뷰 본문으로 검색 API
export const getReviewSearchResultsByReviewContent = async(searchKeyword) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/search/review-content', {
            params: {searchKeyword: searchKeyword}
            });
        return response.data;
    } catch (error){
        console.error('Fail getReviewSearchResultsByReviewContent API call: ',error);
        return null;
    }
};

// 책 제목으로 검색 API
export const getReviewSearchResultsByBookTitle = async(searchKeyword) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/search/book-title', {
            params: {bookTitle: searchKeyword}
            });
        return response.data;
    } catch (error){
        console.error('Fail getReviewSearchResultsByBookTitle API call: ', error);
        return null;
    }
};

// 리뷰 작성자로 검색 API
export const getReviewSearchResultsByReviewWriter = async(searchKeyword) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/search/review-writer', {
            params: {reviewWriter: searchKeyword}
            });
        return response.data;
    } catch (error){
        console.error('Fail getReviewSearchResultsByReviewWriter API call: ',error);
        return null;
    }
};

// 추천 리뷰 조회 API
export const getRecommendedReviews = async() => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/recommended');
        return response.data;
    } catch (error){
        console.error('Fail getRecommendedReviews API call: ',error);
        return null;
    }
};

// 리뷰 상세 조회 API
export const getReviewDetailsByReviewId = async(reviewId) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/reviews/details', {
            reviewId: reviewId
        });
        return response.data;
    } catch (error){
        console.error('Fail getRecommendedReviews API call: ',error);
        return null;
    }
};