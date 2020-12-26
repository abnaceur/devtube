import axios from "axios/index";
import {
    EDIT_PRODUCT_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function editProdDash(userId, token, dispatch, data) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/product/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: EDIT_PRODUCT_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: EDIT_PRODUCT_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: EDIT_PRODUCT_DASH,
                payload: false,
            })
        });
}

export function editProductDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        const dataHttp = new FormData()

        dataHttp.append('productTitle', data.productTitle);
        dataHttp.append('productDescription', data.productDescription);
        dataHttp.append('productPrice', data.productPrice);
        dataHttp.append('productId', data.productId);
        dataHttp.append('photoChanged', data.photoChanged);
        dataHttp.append('productStatus', data.productStatus);
        dataHttp.append('productPhoto', data.photo);
    
        if (data.photoChanged === true)
            dataHttp.append('file', data.productPhoto, data.productPhoto.name)
        
        await editProdDash(userId, token, dispatch, dataHttp)
    }
};