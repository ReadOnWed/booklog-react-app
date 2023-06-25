import React, { useState, useEffect, ChangeEvent } from 'react';
import './Book.css';
import { getCategories } from '../../api/bookApi';


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

type Option = {
    value: string;
    label: string;
};

// React.FC<> : 함수형 컴포넌트(functional component)를 정의
const BookSearchForm: React.FC<BookSearchFormProps> = ({ onSearch, bookSearchParams }) => {

    // 각 필드의 입력 상태를 useState 훅을 사용하여 관리
    const [inputTitle, setInputTitle] = useState('');
    const [inputCategory, setInputCategory] = useState('');
    const [inputPublisher, setInputPublisher] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setInputCategory(event.target.value);
      };
    
      const [options, setOptions] = useState<Option[]>([]);

      useEffect(() => {
        const getCategoriesData = async () => {
          const categories = await getCategories();
          if (categories) {
            setOptions(categories);
          }
        };
    
        getCategoriesData();
      }, []);

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
                className='search__bar__item'
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                placeholder={inputTitle ? inputTitle : "책 제목"}
                onKeyDown={onKeyPress}
            />
            <select
                className='search__bar__item__category'
                value={inputCategory}
                onChange={handleCategoryChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            <input
                className='search__bar__item'
                type="text"
                value={inputPublisher}
                onChange={(e) => setInputPublisher(e.target.value)}
                placeholder={inputPublisher ? inputPublisher : "출판사"}
                onKeyDown={onKeyPress}
            />
            <input
                className='search__bar__item'
                type="text"
                value={inputAuthor}
                onChange={(e) => setInputAuthor(e.target.value)}
                placeholder={inputAuthor ? inputAuthor : "저자"}
                onKeyDown={onKeyPress}
            />
            <button onClick={handleSearch} className='search__logo'>
                <img className="search__icon" src={"images/search.png"}></img>
            </button>
        </div>
    );
};

export default BookSearchForm;