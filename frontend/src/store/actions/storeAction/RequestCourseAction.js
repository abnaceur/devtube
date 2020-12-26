import axios from "axios/index";
import {
    REQUEST_COURSE,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function addRequest(userId, token, dispatch, data) {

    axios.post(process.env.REACT_APP_API_URL + "/products/request/course/" + userId, data,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: REQUEST_COURSE,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: REQUEST_COURSE,
                payload: false,
            })
        });
}

export function addRequestAction(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await addRequest(userId, token, dispatch, data)
    }

};
