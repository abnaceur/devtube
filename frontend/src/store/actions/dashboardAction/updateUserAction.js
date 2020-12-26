import axios from "axios/index";
import {
    UPDATE_MEMBER_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function updateDash(userId, token, dispatch, data) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/user/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: UPDATE_MEMBER_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: UPDATE_MEMBER_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: UPDATE_MEMBER_DASH,
                payload: false,
            })
        });
}

export function updateUserDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await updateDash(userId, token, dispatch, data)
    }
};