import React from 'react';
import "./Header.css";
import { NavLink } from 'react-router-dom';

// 상위 컴포넌트에서 받아오는 props를 재사용할 일이 없기 때문에 interface로 선언(type으로 작성해도 무방)
interface PrimaryButtonProps {
  data: {
    name: string;
    address: string;
  };
  offBurgerMenuList: Function;
}

export default function PrimaryButtonItem({ data, offBurgerMenuList }: PrimaryButtonProps): JSX.Element {
  const { name, address } = data;

  return (
    <NavLink to={`${address}`} style={{textDecoration: 'none'}}>
        <div className="button" onClick={() => offBurgerMenuList()}>{name}</div>
    </NavLink> 
  );
}