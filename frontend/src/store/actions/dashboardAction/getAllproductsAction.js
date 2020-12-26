import axios from "axios/index";

import {
    LIST_PRODUCTS_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getProductHtttpDash(userId, page, token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/list/products/" + userId + "/" + page, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: LIST_PRODUCTS_DASH,
                payload: res.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: LIST_PRODUCTS_DASH,
                payload: false,
            })
        });
}

export function getProductListDash(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getProductHtttpDash(userId, page, token, dispatch);
    }
};