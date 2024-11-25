import React, {forwardRef} from 'react';

const noWrapStyle = {
    whiteSpace: "nowrap"
}

interface Props {
    type: 'text' | 'password';
    tagId: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /* btn props*/
    useBtn?: boolean;
    btnClick?: () => void;
    btnText?: string;
    keydown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const {type, useBtn, tagId, label, value} = props;
    const {onChange, keydown} = props;

    const {btnClick, btnText} = props;
    return (
        <div className="form-floating d-flex gap-1">
            <input type={type} className="form-control" id={tagId} placeholder="Password" value={value} ref={ref} onChange={onChange} onKeyDown={keydown}/>
            <label htmlFor={tagId}>{label}</label>
            {useBtn &&
            <button type="button" className="btn btn-outline-primary w-auto" style={noWrapStyle} onClick={btnClick}>{btnText}</button>}
        </div>
    );
});

export default Input;