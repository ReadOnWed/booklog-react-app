import React, {useState} from "react";
import "./Header.css";
import { useNavigate, Link  } from "react-router-dom";
import HeaderItem from "./HeaderItem";
import InputForm from "./InputForm";
import PrimaryButtonItem from "./PrimaryButtonItem";

function Header(): JSX.Element {
    const navigate = useNavigate();

    /*
        useState 훅을 이용하여 menuToggle 상태값을 false로 초기화
        - menuToggle = true : 메뉴의 목록들을 노출한다(햄버거를 눌렀을때)
        - menuToggle = false : 햄버거 버튼만 보인다(목록이 노출되지 않음)
        배열에 두번째에 있는 setMenuToggle을 이용하여 menuToggle을 변경

        menuToggle : 햄버거 아이콘(≡), 반응형 웹 ui에서 login과 mypage 버튼에 쓰인다
    */
    const [menuToggle, setMenuToggle] = useState<boolean>(false);
    // menuToggle 상태에 따라 햄버거 아이콘 / 취소 아이콘을 노출
    const imageName = !menuToggle? "burger_menu":"cancel";
    const imagePath = `images/${imageName}.png`;

    const [searchToggle, setSearchToggle] = useState<boolean>(false);

    const menu = [
        { name: "도서", address: "/books" },
        { name: "회원", address: "/members" },
        { name: "리뷰", address: "/reviews" },
        { name: "거래", address: "/payments" },
        { name: "메시지", address: "/chat" },
    ];
    const primary_button_list = [
        { name: "login", address: "/loginPage"},
        { name: "mypage", address : "/myPage"},
    ];

    return (
        <header className="header__wrapper">
            <div className="header__box">
                <div className="booklog_logo" >
                    <Link to="/" style={{ textDecoration: "none"}}>
                        <img className="logo_image" src={"images/logo.png"}/>
                        <div className="booklog__title">
                            <span className="booklog__title__B">B</span>
                            <span className="booklog__title__ook">ook</span>
                            <span className="booklog__title__LOG">LOG</span>
                        </div>
                    </Link>
                </div>
                <div className="search__box">
                <InputForm
                        offSearchBarToggle={() => setMenuToggle(false)}
                    />
                </div>
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
                <div 
                    /* menuToggle = false인 경우 
                        1. 컴포넌트를 처음 마운트
                        2. 열려있는 버거 아이콘을 닫기위해 클릭한 경우
                    */
                    className={!menuToggle ? "burger__menu" : "primary__button__list__column"}
                    onClick={() =>
                        menuToggle ? setMenuToggle(false) : setMenuToggle(true)
                    }
                >
                    <img className="burger__menu__icon" src={imagePath}></img>
                </div>
                <div className={[
                        "burger__menu__box",
                        !menuToggle ? "hidden" : "visible",
                    ].join(" ")}
                >
                    <div className="primary__button__list">
                        {primary_button_list.map((data) => (
                            <PrimaryButtonItem
                                data={data}
                                key={data.address}
                                offBurgerMenuList={() => setMenuToggle(false)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </header> 
    );
}

export default Header;