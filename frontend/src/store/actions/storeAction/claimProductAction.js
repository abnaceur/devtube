import axios from "axios/index";
import {
    CLAIM_PRODUCT,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getProducts(userId, token, dispatch, data) {

    axios.post(process.env.REACT_APP_API_URL + "/products/claim/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: CLAIM_PRODUCT,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: CLAIM_PRODUCT,
                payload: "",
            })
        });
}

export function claimProduct(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        if (data === "") {
            dispatch({
                type: CLAIM_PRODUCT,
                payload: "",
            })
        } else
            await getProducts(userId, token, dispatch, data)
    }

};