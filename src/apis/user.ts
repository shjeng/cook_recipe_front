import axios from "axios";
import SignUpRequestDto from "./request/user/Sign-up/sign-up-request.dto";
import {LOGIN_PATH, API_DOMAIN} from "../constant";
import {LoginResponseDto} from "./response/user/Login";
import User from "../types/interface/user.interface";


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

const GET_USER_INFO = () => `${API_DOMAIN}/user/info`;
export const getUserInfo = async (accessToken: string) => {
    return await axios.get(GET_USER_INFO(),{headers: {Authorization: `Bearer ${accessToken}`}} ).then((res) => {
        return res.data as User;
    }, (error) => {
        console.log(error);
        return errorResponse(error);
    })
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