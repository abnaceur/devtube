import axios from "axios/index";
import {
    GET_ALL_CLAIMS,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getClaims(userId,token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/claims/" + userId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_CLAIMS,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: GET_ALL_CLAIMS,
                payload: [],
            })
        });
}

export function getAllClaimsList(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getClaims(userId, token, dispatch, page)
    }

};