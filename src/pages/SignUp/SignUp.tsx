import React, {ChangeEvent, useRef, useState} from 'react';
import Input from "../../component/Input/Input";

const SignUp = () => {
    const idRef = useRef<HTMLInputElement>(null);

    const [id, setId] = useState<string>('');

    const idChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setId(value);
    }

    const dupleBtnClick = () => {
        console.log('중복확인');
    }
    return (
        <div className="d-flex  w-100 ">
            <main className="w-50 m-auto c_form  border border-1 rounded p-2  ">
                <Input ref={idRef} useBtn={true} type={'text'} tagId={'id'} label={'ID'} value={id} onChange={idChange} btnClick={dupleBtnClick} btnText={"중복확인"}/>
                {/*<Input/>*/}
                {/*<Input/>*/}
                {/*<Input/>*/}
            </main>
        </div>
);
};

export default SignUp;