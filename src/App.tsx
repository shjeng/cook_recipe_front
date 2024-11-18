import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {LOGIN_PATH, MAIN_PATH, SIGNUP_PATH} from "./constant";
import Main from "./pages/Main/Main";
import MainContent from "./layout/MainContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

function App() {
  return (
      <>
        <Routes>
            <Route element={<MainContent />}>
                <Route path={MAIN_PATH()} element={<Main />}/>
                <Route path={SIGNUP_PATH()} element={<SignUp />}/>
                <Route path={LOGIN_PATH()} element={<Login />}/>
            </Route>
        </Routes>
      </>
  );
}

export default App;
