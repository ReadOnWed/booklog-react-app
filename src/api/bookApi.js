import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// 평점이 높은 책 목록 조회 API 호출
export const getTopRatedBooks = async() => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/top-rated');
        return response.data;
    } catch (error){
        console.error('Fail Books top-rated API call: ',error);
        return null;
    }
};

// 한 달간 리뷰가 많은 책 목록 조회 API 호출
export const getTopReviewedBooksInMonth = async() => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/top-reviewed-in-month');
        return response.data;
    } catch (error){
        console.error('Fail Books top-reviewed-in-month API call: ',error);
        return null;
    }
};

// 최근에 리뷰가 등록된 책 목록 조회 API 호출
export const getRecentReviewBooks = async() => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/recent-reviewed');
        return response.data;
    } catch (error){
        console.error('Fail Books recent-reviews API call: ',error);
        return null;
    }
};

// 책 검색 API 호출
export const getBookSearchResults = async(title, category, publisher, author) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/search', {
            params: {
                title: title,
                category: category,
                publisher: publisher,
                author: author
                }
            });
        return response.data;
    } catch (error){
        console.error('Fail Books search API call: ',error);
        return null;
    }
};

// 책 id로 상세 정보 조회 API
export const getBookDetailsSearchByBookId = async(bookId) => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/details', {
            params: {
                bookId: bookId
            }
        });
        return response.data;
    } catch (error){
        console.error('Fail BookSearchDeatilByBookId API call: ', error);
        return null;
    }
};

// 도서 category 호출
export const getCategories = async() => {
    try {
        const response = await axios.get('http://localhost:8080/v1/books/categories')
        return response.data;
    } catch (error){
        console.error('Fail BookSearchDeatilByBookId API call: ', error);
        return null;
    }
};