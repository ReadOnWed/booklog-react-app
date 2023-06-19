import React, { useState, useEffect } from 'react';
import './Book.css';

type BookSearchFormProps = {
    onSearch: (searchData: BookSearchParams) => void;
    bookSearchParams?: BookSearchParams;
};

type BookSearchParams = {
    title?: string | null;
    category?: string | null;
    publisher?: string | null;
    author?: string | null;
};

// React.FC<> : 함수형 컴포넌트(functional component)를 정의
const BookSearchForm: React.FC<BookSearchFormProps> = ({ onSearch, bookSearchParams }) => {

    // 각 필드의 입력 상태를 useState 훅을 사용하여 관리
    const [inputTitle, setInputTitle] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputPublisher, setInputPublisher] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');

    useEffect(() => {
        // 검색 조건이 모두 null인 경우를 핸들링
        const { title = null, category = null, publisher = null, author = null } = bookSearchParams || {};
        setInputTitle(title || '');
        setInputCategory(category || '');
        setInputPublisher(publisher || '');
        setInputAuthor(author || '');
    }, [bookSearchParams]);

    const handleSearch = () => {
        // 입력된 검색 조건이 없거나 공백일 경우 검색을 막음
        if (
            !inputTitle.trim() && 
            !inputCategory.trim() && 
            !inputPublisher.trim() && 
            !inputAuthor.trim()) {
            return;
        }

        const searchData: BookSearchParams = { 
            title: inputTitle, 
            category: inputCategory, 
            publisher: inputPublisher,
            author: inputAuthor
        };
        onSearch(searchData);
    };

    // Enter 키를 눌러도 검색 가능
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="book__search__bar">
            <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder={inputTitle ? inputTitle : "책 제목"}
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value)}
                placeholder={inputCategory ? inputCategory : "분류"}
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={inputPublisher}
                onChange={(e) => setInputPublisher(e.target.value)}
                placeholder={inputPublisher ? inputPublisher : "출판사"}
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={inputAuthor}
                onChange={(e) => setInputAuthor(e.target.value)}
                placeholder={inputAuthor ? inputAuthor : "저자"}
                onKeyDown={onKeyPress}
            />
            <button onClick={handleSearch}>검색</button>
        </div>
    );
};

export default BookSearchForm;