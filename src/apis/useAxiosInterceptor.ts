import React from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import {LOGIN_PATH} from "../constant";

const API_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN + "/api";

// 커스텀 훅으로 인터셉터 관리
export const useAxiosInterceptor = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const [isRetrying, setIsRetrying] = React.useState(false);
    React.useEffect(() => {
        // 요청 인터셉터
        // const requestInterceptor = axios.interceptors.request.use(
        //     (config) => {
        //         const accessToken = cookies.accessToken;
        //         console.log(cookies);
        //         debugger;
        //         if (accessToken) {
        //             config.headers.Authorization = `Bearer ${accessToken}`;
        //         }
        //         return config;
        //     },
        //     (error) => Promise.reject(error)
        // );

        // 응답 인터셉터
        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                alert(error.response?.status === 401 && !originalRequest._retry && !isRetrying && error.response?.data.code === 'EJT');
                if (error.response?.status === 401 && !originalRequest._retry && !isRetrying && error.response?.data.code === 'EJT') {
                    alert(error.response.data.code);
                    setIsRetrying(true);
                    originalRequest._retry = true;

                    try {
                        console.log(error.response);
                        debugger;
                        if (!cookies.refreshToken) {
                            console.log("refreshToken이 없습니다.");
                            throw new Error('refreshToken이 없습니다.');
                        }
                        const refreshToken = cookies.refreshToken;
                        const response = await axios.post(`${API_DOMAIN}/auth/refresh`, { refreshToken });

                        const { accessToken, refreshToken: newRefreshToken, accessTokenExpiredMs } = response.data;

                        // 새 토큰들 쿠키에 설정
                        setCookie('accessToken', accessToken, {
                            path: '/',
                            expires: new Date(accessTokenExpiredMs)
                        });

                        if (newRefreshToken) {
                            setCookie('refreshToken', newRefreshToken, {
                                path: '/',
                                // 리프레시 토큰 만료 시간 설정
                            });
                        }

                        // 원래 요청 재시도
                        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        // 토큰 갱신 실패 시 로그아웃 처리
                        removeCookie('accessToken');
                        removeCookie('refreshToken');

                        // 로그인 페이지로 리다이렉트 등 추가 처리
                        window.location.href = LOGIN_PATH();

                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            }
        );

        // 클린업 함수: 컴포넌트 언마운트 시 인터셉터 제거
        return () => {
            // axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [cookies.accessToken, cookies.refreshToken, setCookie, removeCookie]);
};