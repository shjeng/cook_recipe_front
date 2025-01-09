import axios from "axios";
import {API_DOMAIN} from "../constant";

const GET_USER_ROLE = () => `${API_DOMAIN}/role`;
export const getRoleToken = async (accessToken: string) => {
    return await axios.get(GET_USER_ROLE(), {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((response) => {
            return response;
    });
}