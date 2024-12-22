import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {CATEGORY_PATH, LOGIN_PATH, MAIN_PATH, SIGNUP_PATH, TEST_PATH} from "./constant";
import Main from "./pages/Main/Main";
import MainContent from "./layout/MainContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import {CookiesProvider, useCookies} from "react-cookie";
import Test from "./test_directory/Test/Test";
import {useAxiosInterceptor} from "./apis/useAxiosInterceptor";
import Category from "./pages/Category/Category";
import {getUserInfo} from "./apis/user";
import {useStore} from "zustand/react";
import useLoginStore from "./store/login.store";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const {loginUser, setLoginUser, resetLoginUser} = useLoginStore();
    useAxiosInterceptor();


    useEffect(() => {
        if (cookies.accessToken) {
            getUserInfo(cookies.accessToken).then((res) => {
                if (res) {
                    console.log()
                    resetLoginUser();
                } else {
                    alert('회원정보를 가져오는대 실패했습니다.');
                }
            });
        } else {
            resetLoginUser();
        }

    }, [cookies.accessToken]);

    return (
        <>
            <CookiesProvider>
                <Routes>
                    <Route element={<MainContent/>}>
                        <Route path={MAIN_PATH()} element={<Main/>}/>
                        <Route path={SIGNUP_PATH()} element={<SignUp/>}/>
                        <Route path={LOGIN_PATH()} element={<Login/>}/>
                        <Route path={TEST_PATH()} element={<Test/>}/>
                        <Route path={CATEGORY_PATH()} element={<Category/>}/>
                    </Route>
                </Routes>
            </CookiesProvider>
        </>
    );
}

export default App;
