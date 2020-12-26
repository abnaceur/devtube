import axios from "axios/index";
import {
    RM_PRODUCT_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function rmProductDash(userId, token, dispatch, productId) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/remove/product/" + userId + "/" + productId, {}, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: RM_PRODUCT_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: RM_PRODUCT_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: RM_PRODUCT_DASH,
                payload: false,
            })
        });
}

export function removeProductDash(productId) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await rmProductDash(userId, token, dispatch, productId)
    }
};