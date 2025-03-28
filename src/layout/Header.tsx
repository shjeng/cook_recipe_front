import React from 'react';
import {useNavigate} from "react-router-dom";
import {ADMIN_CATEGORY_LIST_PATH, LOGIN_PATH, MAIN_PATH} from "../constant";
import useLoginStore from "../store/login.store";

const Header = () => {

    const {loginUser, setLoginUser, resetLoginUser} = useLoginStore();

    const navigate = useNavigate();
    const mainPage = () => {
        navigate(MAIN_PATH());
    }
    const goPage = (path:string) => {
        navigate(path);
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
                        {!loginUser &&
                            <li className="nav-item">
                                <div className="nav-link pointer" onClick={() => goPage(LOGIN_PATH())}>Login</div>
                            </li>}
                        {loginUser?.role  &&
                            <li className="nav-item">
                                <div className="nav-link pointer" onClick={() => goPage(ADMIN_CATEGORY_LIST_PATH())}>Login</div>
                            </li>}

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