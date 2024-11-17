import React from 'react';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const mainPage = () => {
        navigate('/');
    }
    return (
        <>
            <div className="container">
                <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none pointer" onClick={mainPage}>
                        <svg className="bi me-2" width="40" height="32">
                            <use href="#bootstrap"/>
                        </svg>
                        <span className="fs-4">시화의 레시피</span>
                    </div>

                    <ul className="nav nav-pills">
                        <li className="nav-item"><a href="#" className="nav-link active" aria-current="page">Home</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Features</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">Pricing</a></li>
                        <li className="nav-item"><a href="#" className="nav-link">FAQs</a></li>
                        <li className="nav-item"><a href="/user/login" className="nav-link">Login</a></li>
                    </ul>
                </header>
            </div>
            <div className="container">
                <nav className="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                </nav>
            </div>
        </>
)
    ;
};

export default Header;