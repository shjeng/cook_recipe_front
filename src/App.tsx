import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {LOGIN_PATH, MAIN_PATH, SIGNUP_PATH} from "./constant";
import Main from "./pages/Main/Main";
import MainContent from "./layout/MainContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./layout/Footer";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
      <>
        <Routes>
            <Route element={<MainContent />}>
                <Route path={MAIN_PATH()} element={<Main />}/>
                <Route path={SIGNUP_PATH()} element={<SignUp />}/>
            </Route>
        </Routes>
      </>
  );
}

export default App;
