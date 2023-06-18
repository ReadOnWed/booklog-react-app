import React, { useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import './Books.css'
import { getBookSearchDeatilByBookId } from '../../api/bookApi';

const BookDetailPage: React.FC = () => {
    // 페이지 이동시 연산이 필요한 경우 useNavigate 훅을 사용
    const navigate = useNavigate();

    // 현재 경로 정보를 객체 형태로 가져오기 위한 useLoaction 훅
    // React Router와 상호작용하여 동적 라우팅 기능을 구현한다
    /* 아래와 같은 상황에 사용, 
        - 현재 경로 정보를 확인하여 조건부 랜더링을 수행
        - 현재 경로 정보를 기반으로 특정 동작을 수행(페이지 전환, 데이터 요청 등)
        - 현재 경로 정보를 다른 컴포넌트로 전달
    */
    const location = useLocation();

    /* useParams 훅을 사용하며 URL 경로의 매개변수 값(bookId)을 추출 */
    const { bookId } = useParams();

    useEffect(() => {

        const handlePopState = () => {
            navigate('/books' + location.search);
        };

        // 브라우저 뒤로가기를 눌러서 이전 페이지로 가기 위해 'popState' 이벤트를 사용하여 이벤트 핸들러 등록
        window.addEventListener('popstate', handlePopState);

        // clean-up 메소드 : 컴포넌트가 마운트 해제될 떄(= 컴포넌트가 소멸될 때), 등록된 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [bookId]);

    return (
        <div> 
            Book ID : {bookId} 
        </div>
    )
}

export default BookDetailPage;