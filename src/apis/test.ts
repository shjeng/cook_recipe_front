import axios from "axios";

const API_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN + "/api";

const TEST_URL = () => `${API_DOMAIN}/test/test`;
export const testRequest = async () => {
    return await axios.get(TEST_URL())
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