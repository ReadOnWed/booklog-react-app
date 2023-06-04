import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';

// 상위 컴포넌트에서 받아오는 props를 재사용할 일이 없기 때문에 interface로 선언(type으로 작성해도 무방)
interface NavProps {
  data: {
    name: string;
    address: string;
  };
}

export default function NavItem({ data }: NavProps): JSX.Element {
  const { name, address } = data;

  type IconWordMapping = {
    [key: string]: string;
  };
  const iconWordMapping: IconWordMapping = {
    "도서" : "books",
    "회원" : "members",
    "리뷰": "reviews",
    "거래": "payments",
    "메시지" : "chat"
  };
  const imageName = iconWordMapping[name];
  const imagePath = `images/${imageName}.png`;

  return (
    <NavLink
      to={`${address}`}
      className="menu__item"
      style={
        ({isActive}) => (
          isActive ? 
          {
            textDecoration: 'none',
            backgroundColor: '#ffffff',
            borderWidth: 5,
            borderStyle: 'solid',
            borderColor: '#c37857'
          }
          :{textDecoration: 'none'}
        )
      }>
        <img className="menu__icon" src={imagePath}/>
        <div className="menu__name">{name}</div>
      </NavLink> 
  );
}