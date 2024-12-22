import React, {useRef, useState} from 'react';
import Input from "../../component/Input/Input";

const Category = () => {
    const [category, setCateogry] = useState<string>('');
    const categoryRef = useRef<HTMLInputElement>(null);

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