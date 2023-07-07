import React, {useState} from "react";
import "./Header.css";
import { useNavigate, Link  } from "react-router-dom";
import HeaderItem from "./HeaderItem";

interface InputFormProps {
    offSearchBarToggle: Function;
}

  
function InputForm({ offSearchBarToggle }: InputFormProps): JSX.Element {
    // input창(작성자 창)의 state
    const [author, setAuthor] = useState("");

    return (
        <div className="search__bar">
            <img className="search__icon" src={"images/search.png"}></img>
            <input
                value = {author}
                onChange={(e)=>{setAuthor(e.target.value)}}
                className="search__input"
                placeholder="검색"
            />
        </div>
    )
}
export default InputForm;