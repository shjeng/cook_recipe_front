import React from 'react';
import {useNavigate} from "react-router-dom";
import {RECIPE_LIST_PATH} from "../../constant";

const RecipeList = () => {
    const navigate = useNavigate();


    return (
        <div>
            레시피 작성
            <button className="btn btn-primary py-2" type="submit" onClick={() => navigate(RECIPE_LIST_PATH())}>나의 레시피 작성</button>
        </div>
    );
};

export default RecipeList;
