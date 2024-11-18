import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";

const MainContent = () => {

    return (
        <>
        <Header/>
        <div className="main-content d-flex flex-column flex-grow-1 flex-shrink-0">
            <Outlet/>
        </div>
        <Footer/>
        </>
        )
    ;
};

export default MainContent;