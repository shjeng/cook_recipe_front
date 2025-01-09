import React, {useEffect, useRef, useState} from 'react';
import Input from "../../component/Input/Input";
import {getRoleToken} from "../../apis/admin";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import {MAIN_PATH} from "../../constant";

const Category = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
    const [category, setCateogry] = useState<string>('');
    const categoryRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = () => {
            if (!cookies.accessToken) {
                alert('잘못된 접근입니다.');
                navigate(MAIN_PATH());
            }
            getRoleToken(cookies.accessToken).then(res => {

            });
        }
        authCheck();
    }, []);

    const categoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCateogry(event.target.value);
    }



    const submitBtnclick = () => {

    }

    return (
        <div className="container my-5">
            <h2 className="mb-4">카테고리 등록</h2>
            <form  className="needs-validation">
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">
                        카테고리 이름
                    </label>
                    <Input ref={categoryRef} type={'text'} tagId={'pw'} label={'카테고리 이름'} onChange={categoryChange} value={category} useBtn={true} btnText={"중복확인"}/>
                </div>
                <button type="submit" className="btn btn-primary">
                    등록
                </button>
            </form>
        </div>
    );
};

export default Category;