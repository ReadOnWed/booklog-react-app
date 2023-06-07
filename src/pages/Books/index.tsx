import React from "react";


function Book(): JSX.Element {
    return (
        <div className="Book">            
            <div className="bookUnderDevelopment">
                <img className="underDevelopmentImage" alt="under_development" src="images/under_development.png"/>
            </div>
            <h1>Book index입니다</h1>
        </div>
    )
}

export default Book;