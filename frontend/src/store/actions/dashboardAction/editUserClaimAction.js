import axios from "axios/index";
import {
    EDIT_CLAIM_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function editClaimDash(userId, token, dispatch, data) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/claim/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: EDIT_CLAIM_DASH,
                payload: results.data,
            })
            setTimeout(() => {
                dispatch({
                    type: EDIT_CLAIM_DASH,
                    payload: "",
                })
            }, 300);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: EDIT_CLAIM_DASH,
                payload: false,
            })
        });
}

export function editUserClaimDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await editClaimDash(userId, token, dispatch, data)
    }
};