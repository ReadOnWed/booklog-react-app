import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookSearchForm from '../../components/Books/BookSearchForm';
import BookSearchResults from '../../components/Books/BookSearchResults';
import BookSearchDefault from '../../components/Books/BookSearchDefault';

import './Books.css'
import { getBookSearchResults, getRecentReviewBooks, getTopRatedBooks, getTopReviewedBooksInMonth } from '../../api/bookApi';

type Book = {
    id: string;
    title: string;
    rating: number;
    totalReviews: number;
    recentReview: string;
    author: string;
    publisher: string;
    publicationDate: string;
    totalResults: number;
};

type BookSearchParams = {
    title?: string | null;
    category?: string | null;
    publisher?: string | null;
    author?: string | null;
};

const BooksPage: React.FC = () => {
    const navigate = useNavigate();

    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [bookSearchParams, setBookSearchParams] = useState<BookSearchParams>();
    const [topRatedBooks, setTopRatedBooks] = useState<Book[]>([]);
    const [topReviewedBooksInMonth, setTopReviewedBooksInMonth] = useState<Book[]>([]);
    const [recentReviewBooks, setRecentReviewBooks] = useState<Book[]>([]);
    const [showSearchResults, setShowSearchResults] = useState(false);

    /* useEffect 훅 : 컴포넌트의 생명주기와 관련하여 특정 동작을 수행
    
        - useEffect 훅을 사용하여 API 요청(함수를 호출할때 useEffect 훅을 사용하는 것이 일반적)
        - 컴포넌트가 랜더링된 이후 useEffect 훅이 실행되며, 의존성 배열에 지정된 값들이 변경될 때마다 호출됨
    */
    useEffect(() => {
        const fetchData = async () => {

            // URL 경로에서 검색어가 있는 경우(상세페이지에서 검색결과 페이지로 돌아오는 경우) 각 검색어를 추출
            const searchParamsByUrlPath = new URLSearchParams(location.search);
            const title = searchParamsByUrlPath.get('title');
            const category = searchParamsByUrlPath.get('category');
            const publisher = searchParamsByUrlPath.get('publisher');
            const author = searchParamsByUrlPath.get('author');

            if (title || category || publisher || author) {
                // 해당 검색어를 바탕으로 조회 책 검색 api 요청
                const searchResults = await getBookSearchResults(title, category, publisher, author);
                setSearchResults(searchResults);
                
                // 검색어 조건을 bookSearchParams 상태에 저장 (BookDetailPage로 넘어갈때 검색어 정보를 저장하기 위함)
                const newSearchParams: BookSearchParams = {
                    title: title || null,
                    category: category || null,
                    publisher: publisher || null,
                    author: author || null
                };
                setBookSearchParams(newSearchParams);

                setShowSearchResults(true);
            }
            else {
                // 평점이 높은 책 조회 API 요청
                const topRatedBooks = await getTopRatedBooks();
                setTopRatedBooks(topRatedBooks);

                // 한달간 리뷰가 많은 책 조회 API 요청
                const topReviewedBooksInMonth = await getTopReviewedBooksInMonth();
                setTopReviewedBooksInMonth(topReviewedBooksInMonth);

                // 최근 리뷰가 등록된 책 조회 API 요청
                const recentReviewBooks = await getRecentReviewBooks();
                setRecentReviewBooks(recentReviewBooks);
            }
        };

        fetchData();
    }, [location.search]); // 의존성 배열, 경로 정보(location.search)가 달라질때마다 useEffect 훅 실행하여 재랜더링

    const handleSearch = (searchData: BookSearchParams) => {
        
        // API 요청 및 응답 처리 로직
        // searchData를 사용하여 API 서버에 요청하고 응답 결과를 setSearchResults로 업데이트
        const fetchData = async () => {
            // 책 조회 API 요청
            const searchResults = await getBookSearchResults(
                searchData.title,
                searchData.category,
                searchData.publisher,
                searchData.author
            );
            setSearchResults(searchResults);
            
            const newSearchParams: BookSearchParams = {
                title: searchData.title || null,
                category: searchData.category || null,
                publisher: searchData.publisher || null,
                author: searchData.author || null
            };
            setBookSearchParams(newSearchParams);

            setShowSearchResults(true);

            // useNavigate 훅을 통해 검색어를 URL 경로에 추가
            const searchParamsByUrlPath = new URLSearchParams();
            if (searchData.title) searchParamsByUrlPath.set('title', searchData.title);
            if (searchData.category) searchParamsByUrlPath.set('category', searchData.category);
            if (searchData.publisher) searchParamsByUrlPath.set('publisher', searchData.publisher);
            if (searchData.author) searchParamsByUrlPath.set('author', searchData.author);
            navigate(`/books?${searchParamsByUrlPath.toString()}`);
        };

        fetchData();
    };

    return (
        <div className='book__wrapper'>
            <BookSearchForm onSearch={handleSearch} />

            {showSearchResults ? (
                <BookSearchResults 
                    searchResults={searchResults}
                    bookSearchParams={bookSearchParams}
                />
            ) : (
                <BookSearchDefault
                    topRatedBooks={topRatedBooks} 
                    topReviewedBooksInMonth={topReviewedBooksInMonth} 
                    recentReviewBooks={recentReviewBooks}
                />
            )}
        </div>
    );
};

export default BooksPage;