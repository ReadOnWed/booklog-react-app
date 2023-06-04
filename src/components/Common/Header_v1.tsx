import React, {useState} from "react";
import "./Header.css";
import { useNavigate, Link  } from "react-router-dom";
import HeaderItem from "./HeaderItem";

function Header(): JSX.Element {
    const navigate = useNavigate();

    // input창(작성자 창)의 state
    const [author, setAuthor] = useState("");

    const menu = [
        { name: "책", address: "/books" },
        { name: "회원", address: "/members" },
        { name: "리뷰", address: "/reviews" },
        { name: "거래", address: "/payments" },
        { name: "채팅", address: "/chat" },
    ];

    return (
        <header className="header__wrapper">
            <div className="header__box">
                <Link to="/feed">
                    <div className="booklog_logo">
                        <img className="logo__image" src={"images/logo.png"}/>
                    </div>
                    <div className="booklog__title">
                        <span className="booklog__title__B">B</span>
                        <span className="booklog__title__ook">ook</span>
                        <span className="booklog__title__LOG">LOG</span>
                    </div>
                </Link>
                <input 
                        value = {author}
                        onChange={(e)=>{setAuthor(e.target.value)}}
                        className="search__bar"
                        placeholder="검색"
                />
                <div className="menu__box">
                    <div className="menu__list">
                    {menu.map((data) => (
                        <HeaderItem
                        data={data}
                        key={data.address}
                        />
                    ))}
                    </div>
                </div>
                <div className="primary__button__login">Login</div>
                <div className="primary__button__myPage">MyPage</div>
            </div>
        </header> 
    );
}

export default Header;