import axios from "axios/index";

import {
    LIST_CATEGORIES_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getCategoriesHtttpDash(userId, page, token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/list/categories/" + userId + "/" + page, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: LIST_CATEGORIES_DASH,
                payload: res.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: LIST_CATEGORIES_DASH,
                payload: false,
            })
        });
}

export function getCategoriesListDash(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getCategoriesHtttpDash(userId, page, token, dispatch);
    }
};