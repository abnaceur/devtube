import axios from "axios/index";
import {
    RM_CATEGORY_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function rmCategoryDash(userId, token, dispatch, catId) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/remove/category/" + userId + "/" + catId, {}, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: RM_CATEGORY_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: RM_CATEGORY_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: RM_CATEGORY_DASH,
                payload: false,
            })
        });
}

export function removeCategoryDash(catId) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await rmCategoryDash(userId, token, dispatch, catId)
    }
};