import axios from "axios/index";
import {
    GET_ALL_PRODUCTS,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getProducts(token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/products/all/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: GET_ALL_PRODUCTS,
                payload: false,
            })
        });
}

export function getAllProductsList(page) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getProducts(token, dispatch, page)
    }

};