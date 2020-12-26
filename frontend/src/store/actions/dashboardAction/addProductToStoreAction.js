import axios from "axios/index";
import {
    ADD_PRODUCT_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function addProductDash(userId, token, dispatch, data) {

    axios.post(process.env.REACT_APP_API_URL + "/dashboard/product/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: ADD_PRODUCT_DASH,
                payload: results.data,
            })

            setTimeout(() => {
                dispatch({
                    type: ADD_PRODUCT_DASH,
                    payload: "",
                })
            }, 3);

        })
        .catch(err => {
            removeToken();
            dispatch({
                type: ADD_PRODUCT_DASH,
                payload: false,
            })
        });
}

export function addProductToStoreDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const dataHttp = new FormData()

    dataHttp.append('productTitle', data.productTitle);
    dataHttp.append('productDescription', data.productDescription);
    dataHttp.append('productPrice', data.productPrice);
    dataHttp.append('file', data.productPhoto, data.productPhoto.name)

    return async function (dispatch) {
        await addProductDash(userId, token, dispatch, dataHttp)
    }
};