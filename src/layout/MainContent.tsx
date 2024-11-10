import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import Footer from "./Footer";

const MainContent = () => {
    return (
        <>
            <Header/>
            <Outlet />
            <Footer />
        </>
    );
};

export default MainContent;