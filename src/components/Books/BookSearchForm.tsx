import React, { useState } from 'react';
import './Book.css';

type BookSearchFormProps = {
    onSearch: (searchData: BookSearchData) => void;
};

type BookSearchData = {
    title: string;
    category: string;
    publisher: string;
    author: string;
};

// React.FC<> : 함수형 컴포넌트(functional component)를 정의
const BookSearchForm: React.FC<BookSearchFormProps> = ({ onSearch }) => {
    // 각 필드의 입력 상태를 useState 훅을 사용하여 관리
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [publisher, setPublisher] = useState('');
    const [author, setAuthor] = useState('');

    const handleSearch = () => {
        const searchData: BookSearchData = { title, category, publisher, author };
        onSearch(searchData);
    };

    // Enter 키를 눌러도 검색 되도록 구현
    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == 'Enter'){
            handleSearch();
        }
    }
    return (
        <div className='book__search__bar'>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="책 제목"
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="분류"
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                placeholder="출판사"
                onKeyDown={onKeyPress}
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="저자"
                onKeyDown={onKeyPress}
            />
            <>
                <button onClick={handleSearch}>검색</button>
            </>
        </div>
    );
};

export default BookSearchForm;