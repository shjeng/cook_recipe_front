import React, {ChangeEvent, useRef, useState} from 'react';
import Input from "../../component/Input/Input";
import {idDupleCheck, nickNameDupleCheck, signUp} from "../../apis/sign-up";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();

    /* 아이디 관련 */
    const idRef = useRef<HTMLInputElement>(null);
    const [id, setId] = useState<string>('');
    const [dupleCheck, setDupleCheck] = useState<string>(''); // 중복확인한 아이디
    const idChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setId(value);
    }
    const idDupleCheckBtn = () => {
        idDupleCheck(id).then((res) => {
            const dupleCheckId = res as string;
            if (dupleCheckId) {
                alert('사용가능한 아이디입니다.');
                setDupleCheck(dupleCheckId);
            }
        });
    }

    /* 닉네임 확인 */
    const nickNameRef = useRef<HTMLInputElement>(null);
    const [nickName, setNickName] = useState<string>('');
    const [nickNameCheck, setNickNameCheck] = useState<string>('');
    const nickNameChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setNickName(value);
    const nickNameCheckBtn = () => {
        nickNameDupleCheck(nickName).then((res) => {
            if (res) {
                alert('사용가능한 닉네임입니다.');
                setNickNameCheck(res as string);
            }
        });
    }

    const pwRef = useRef<HTMLInputElement>(null);
    const [pw, setPw] = useState<string>('');
    const pwChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setPw(value);
    const pwCheckRef = useRef<HTMLInputElement>(null);
    const [pwCheck, setPwCheck] = useState<string>('');
    const pwCheckChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setPwCheck(value);

    /* 가입 */
    const signUpBtnClick = (event: React.MouseEvent) => {
        if (id !== dupleCheck) {
            alert('아이디 중복확인을 해주세요.');
            idRef.current?.focus();
            return;
        }
        if(nickName !== nickNameCheck){
            alert('닉네임 중복확인을 해주세요.');
            nickNameRef.current?.focus();
            return;
        }
        if (pw !== pwCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            pwCheckRef.current?.focus();
            return;
        }
        const requestBody = {
            id: id,
            password: pw,
            passwordCheck: pwCheck,
            nickname: nickName
        }
        signUp(requestBody).then((res) => {
            if (res) {
                navigate(res);
            }
        });
    }

    return (
        <div className="d-flex  w-100 ">
            <main className="w-50 m-auto c_form  border border-1 rounded p-2">
                <h1 className="h3 mb-3 fw-normal ">회원가입</h1>
                <Input ref={idRef} useBtn={true} type={'text'} tagId={'id'} label={'ID'} value={id} onChange={idChange}
                       btnClick={idDupleCheckBtn} btnText={"중복확인"}/>
                <Input ref={nickNameRef} useBtn={true} type={'text'} tagId={'nickname'} label={'닉네임'} value={nickName}
                       onChange={nickNameChange} btnClick={nickNameCheckBtn} btnText={"중복확인"}/>
                <Input ref={pwRef} type={'password'} tagId={'pwd'} label={'PASSWORD'} onChange={pwChange} value={pw}/>
                <Input ref={pwCheckRef} type={'password'} tagId={'pwdCheck'} label={'PASSWORD CHECK'}
                       onChange={pwCheckChange} value={pwCheck}/>
                <div className="d-flex flex-row-reverse  gap-1">
                    <button className="btn btn-primary" type="button" id="submitBtn" onClick={signUpBtnClick}>가입</button>
                    <a className="btn btn-outline-primary" href="javascript:history.back();">이전</a>
                </div>
            </main>
        </div>
    );
};

export default SignUp;