import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {MAIN_PATH} from "./constant";
import Main from "./pages/Main/main";
import MainContent from "./layout/MainContent";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./layout/Footer";

function App() {
  return (
      <>
        <Routes>
            <Route element={<MainContent />}>
                <Route path={MAIN_PATH()} element={<Main />}/>
            </Route>
        </Routes>
      </>
  );
}

export default App;
