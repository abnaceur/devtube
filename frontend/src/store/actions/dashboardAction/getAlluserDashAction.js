import axios from "axios/index";
import {
    GET_ALL_MEMBERS_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getMemebersDash(userId, token, dispatch, page) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/all/users/" + userId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_MEMBERS_DASH,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: GET_ALL_MEMBERS_DASH,
                payload: false,
            })
        });
}

export function getAllMembersDash(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getMemebersDash(userId, token, dispatch, page)
    }
};