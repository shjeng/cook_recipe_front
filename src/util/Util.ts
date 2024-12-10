import {useCookies} from "react-cookie";
import {MAIN_PATH} from "../constant";

export const useSetAccessToken = (accessToken:string, accessTokenExpiredMs: number) => {
    const [cookies, setCookie] = useCookies();
    const now = new Date().getTime();
    const accessTokenExpires = new Date(now + accessTokenExpiredMs);
    setCookie("accessToken", accessToken, { expires: accessTokenExpires, path: MAIN_PATH()});
}

export const useSetRefreshToken = (accessToken:string, refreshTokenExpiredMs: number) => {
    const [cookies, setCookie] = useCookies();
    const now = new Date().getTime();
    const refreshTokenExpires = new Date(now + refreshTokenExpiredMs);
    setCookie("refreshToken", accessToken, {
        expires: refreshTokenExpires, path: MAIN_PATH(), sameSite: "strict", httpOnly: true}
    );
}

export const useGetAccessToken = () => {
    const [cookies] = useCookies();
    return cookies.accessToken || null; // `accessToken` 쿠키 반환
}

export const useGetRefreshToken = () => {
    const [cookies] = useCookies();
    return cookies.refreshToken || null; // `refreshToken` 쿠키 반환
}