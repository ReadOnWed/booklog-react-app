import React, { useEffect, useState } from "react";

type ReviewSearchFormProps = {
    onSearch: (searchData: ReviewSearchTerms) => void;
    reviewSearchTerms?: ReviewSearchTerms;
};

type ReviewSearchTerms = {
    searchKeyword?: string | null;
    bookTitle?: string | null;
    reviewWriter?: string | null;
};

const ReviewSearchForm: React.FC<ReviewSearchFormProps> = ({ onSearch, reviewSearchTerms }) => {
    // 각 필드의 입력 상태를 useState 훅을 사용하여 관리
    const [inputSearchKeyword, setInputSearchKeyword] = useState('');
    const [inputBookTitle, setInputBookTitle] = useState('');
    const [inputReviewWriter, setInputReviewWriter] = useState('');

    /* 
        리뷰 목록 검색 후 뒤로가기로 다시 검색 form으로 돌아온경우 검색어 상태를 저장
        사용자가 검색 결과를 유지하는 것처럼 보이기 위함(실제로는 조회 api 다시 호출)
    */
    useEffect(() => {
        // 검색 조건이 모두 null인 경우를 핸들링
        const { searchKeyword = null, bookTitle = null, reviewWriter = null } = reviewSearchTerms || {};
        setInputSearchKeyword(searchKeyword || '');
        setInputBookTitle(bookTitle || '');
        setInputReviewWriter(reviewWriter || '');
    }, [reviewSearchTerms]);

    const handleSearch = () => {
        // 입력된 검색 조건이 없거나 공백일 경우 검색을 막음
        if (
            !inputSearchKeyword.trim() &&
            !inputBookTitle.trim() &&
            !inputReviewWriter.trim()
        ) {
            return;
        }

        const searchTerms: ReviewSearchTerms = {
            searchKeyword: inputSearchKeyword,
            bookTitle: inputBookTitle,
            reviewWriter: inputReviewWriter
        };

        onSearch(searchTerms);
    };

    // Enter 키를 눌러도 검색 가능
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // isComposing : 문자가 입력 중일 경우 true를 리턴한다(이벤트 중복발생 방지)
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            handleSearch();
        }
    };

    return (
        <div className="review__search__bar">
            <input
                className='review__bar__item'
                type="text"
                value={inputSearchKeyword}
                onChange={(e) => setInputSearchKeyword(e.target.value)}
                placeholder={inputSearchKeyword ? inputSearchKeyword : "검색어를 입력하세요."}
                onKeyDown={onKeyDown}
            />
            <input
                className='search__bar__item'
                type="text"
                value={inputBookTitle}
                onChange={(e) => setInputBookTitle(e.target.value)}
                placeholder={inputBookTitle ? inputBookTitle : "책 제목"}
                onKeyDown={onKeyDown}
            />
            <input
                className='search__bar__item'
                type="text"
                value={inputReviewWriter}
                onChange={(e) => setInputReviewWriter(e.target.value)}
                placeholder={inputReviewWriter ? inputReviewWriter : "작성자"}
                onKeyDown={onKeyDown}
            />
            <button onClick={handleSearch} className='search__logo'>
                <img className="search__icon" src={"images/search.png"}></img>
            </button>
        </div>
    );
}
export default ReviewSearchForm;