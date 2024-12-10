import axios from "axios";
import SignUpRequestDto from "./request/user/Sign-up/sign-up-request.dto";
import {LOGIN_PATH} from "../constant";
import {useGetAccessToken, useGetRefreshToken, useSetAccessToken, useSetRefreshToken} from "../util/Util";
import {LoginResponseDto} from "./response/user/Login";

const API_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN + "/api";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
    (config) => {
        const accessToken = useGetAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


// 응답 인터셉터
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Access Token 만료 시 처리
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh Token 요청
                const refreshToken = useGetRefreshToken();
                const response = await axios.post('/auth/refresh', {
                    refreshToken,
                });

                const loginResponseDto = response.data.LoginResponseDto;


                // 실패한 요청 재시도
                originalRequest.headers.Authorization = `Bearer ${loginResponseDto.accessToken}`;
                useSetAccessToken(loginResponseDto.accessToken, loginResponseDto.accessTokenExpiredMs);
                useSetRefreshToken(loginResponseDto.refreshToken, loginResponseDto.refreshTokenExpiredMs);

                return axios(originalRequest);
            } catch (refreshError) {
                console.error('토큰 갱신 실패:', refreshError);
                // 로그아웃 처리 또는 사용자에게 알림

                window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

const ID_DUPLE_CHECK = () => `${API_DOMAIN}/user/sign-up/id-check`;
export const idDupleCheck = async (id: string) => {
    return await axios.post(ID_DUPLE_CHECK(), {str: id})
        .then((res) => {
            console.log(res);
            if (!res.data) {
                alert('이미 사용중인 아이디입니다.');
                return null;
            }
            return res.data as string;
        }, (error) => {
            return errorResponse(error);
        });
}

const NICKNAME_DUPLE_CHECK = () => `${API_DOMAIN}/user/sign-up/nickname-check`;
export const nickNameDupleCheck = async (nickname: string) => {
    return await axios.post(NICKNAME_DUPLE_CHECK(), {str: nickname})
        .then((res) => {
            if (!res) {
                alert('이미 사용중인 닉네임입니다.');
                return null;
            }
            return res.data as string;
        }, (error) => {
            return errorResponse(error);
        });
}

const SIGN_UP = () => `${API_DOMAIN}/user/sign-up`;
export const signUp = async (requestDto: SignUpRequestDto) => {
    return await axios.post(SIGN_UP(), requestDto)
        .then((res) => {
            alert('회원가입이 완료되었습니다.');
            return LOGIN_PATH();
        }, (error) => {
            return errorResponse(error);
        });
}

const LOGIN = () => `${API_DOMAIN}/user/login`;
export const login = async (id: string, password: string) => {
    return await axios.post(LOGIN(), {id, password})
        .then((res) => {
            return res.data as LoginResponseDto;
        }, (error) => {
            console.log(error);
            return errorResponse(error);
        });
}

const errorResponse = (error: null | any) => {
    console.log(error);
    if (typeof error.response.data === 'string') {
        alert(error.response.data);
        return;
    } else {
        alert('서버오류');
        return;
    }
}