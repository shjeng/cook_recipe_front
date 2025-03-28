import React from 'react';
import {testRequest} from "../../apis/test";

const Test = () => {

    const btnClick = () => {
        testRequest().then((res) => {
            console.log(res);
        });
    }

    return (
        <div>
            <button onClick={btnClick}>api 테스트 버튼입니다</button>
            {}
        </div>
    );
};

export default Test;