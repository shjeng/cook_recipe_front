import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Input from "../../component/Input/Input";
import {MAIN_PATH, SIGNUP_PATH} from "../../constant";
import {login} from "../../apis/user";
import { LoginResponseDto } from '../../apis/response/user/Login';
import {useCookies} from "react-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies();

    const [id, setId] = useState<string>('');
    const idRef = useRef<HTMLInputElement>(null);
    const idChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setId(value);
    }
    const [pw, setPw] = useState<string>('');
    const pwRef = useRef<HTMLInputElement>(null);
    const pwChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPw(value);
    }
    const pwKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitBtnClick();
        }
    }
    const submitBtnClick = () => {
        if (!id) {
            alert('아이디를 입력해주세요.');
            idRef.current?.focus();
            return;
        }
        if (!pw) {
            alert('비밀번호를 입력해주세요.');
            pwRef.current?.focus();
            return;
        }
        login(id, pw).then((res) => {
            if (!res) {
                return;
            }
            const result = res as LoginResponseDto;
            const { token, expirationTime } = result;
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);
            // 유효시간 : 현재시간 + 백엔드에서 설정한 시간(60분) * 1000
            setCookie("accessToken", token, { expires, path: MAIN_PATH()});
            const referer = result.referer;
            if (referer) {
                window.location.href = referer;
            } else {
                navigate(MAIN_PATH());
            }
        });
    }
    return (
        <div className="container d-flex justify-content-center w-100  flex-grow-1 flex-shrink-0">
            <main className="w-50 m-auto c_form">
                <h1 className="h3 mb-3 fw-normal text-center">로그인</h1>
                <div className="form-floating">
                    <Input ref={idRef} type={'text'} tagId={'id'} label={'ID'} onChange={idChange} value={id}/>
                </div>
                <div className="form-floating">
                    <Input ref={pwRef} type={'password'} tagId={'pw'} label={'PASSWORD'} onChange={pwChange} value={pw} keydown={pwKeyDown}/>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        아이디 저장
                    </label>
                </div>
                <div className="d-flex flex-column">
                    <a className="btn btn-dark w-100 py-2 mb-2" href={SIGNUP_PATH()}>회원가입</a>
                    <button className="btn btn-primary w-100 py-2" type="submit" onClick={submitBtnClick}> Sign in</button>
                </div>
            </main>
        </div>
    );
};

export default Login;