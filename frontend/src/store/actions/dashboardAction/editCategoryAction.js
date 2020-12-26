import axios from "axios/index";
import {
    EDIT_CATEGORY_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function editCatDash(userId, token, dispatch, data) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/category/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: EDIT_CATEGORY_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: EDIT_CATEGORY_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: EDIT_CATEGORY_DASH,
                payload: false,
            })
        });
}

export function editCategotyDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await editCatDash(userId, token, dispatch, data)
    }
};