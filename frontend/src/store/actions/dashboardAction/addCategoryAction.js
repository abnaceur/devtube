import axios from "axios/index";
import {
    ADD_CAT_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function updateDash(userId, token, dispatch, data) {

    axios.post(process.env.REACT_APP_API_URL + "/dashboard/category/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: ADD_CAT_DASH,
                payload: results.data,
            })
            
            setTimeout(() => {
                dispatch({
                    type: ADD_CAT_DASH,
                    payload: "",
                })
            }, 300);

        })
        .catch(err => {
            removeToken();
            dispatch({
                type: ADD_CAT_DASH,
                payload: false,
            })
        });
}

export function addCategoryDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await updateDash(userId, token, dispatch, data)
    }
};