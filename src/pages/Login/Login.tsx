import React from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const useNavaigate = useNavigate();
    return (
        <div className="container d-flex justify-content-center w-100  flex-grow-1 flex-shrink-0">
            <main className="w-50 m-auto c_form">
                <h1 className="h3 mb-3 fw-normal text-center">로그인</h1>
                <div className="form-floating">
                    <input type="text" className="form-control" id="floatingInput" name="id"
                           placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">ID</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">PASSWORD</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        아이디 저장
                    </label>
                </div>
                <div className="d-flex flex-column">
                    <a className="btn btn-dark w-100 py-2 mb-2" href="/user/sign-up">회원가입</a>
                    <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                </div>
            </main>
        </div>
    );
};

export default Login;