import axios from "axios/index";
import {
    UPDATE_USER_NOTIF,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function updateNotifications(userId, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/users/notifications/" + userId, 
    {},{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: UPDATE_USER_NOTIF,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: UPDATE_USER_NOTIF,
                payload: false,
            })
        });
}

export function updateUserNotification() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await updateNotifications(userId, token, dispatch)
    }
};