import axios from "axios/index";

import {
    LIST_CHATBOTMSG_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getChatbotHtttpDash(userId, page, token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/chatbot/list/" + userId + "/" + page, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: LIST_CHATBOTMSG_DASH,
                payload: res.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: LIST_CHATBOTMSG_DASH,
                payload: false,
            })
        });
}

export function getChatbotListDash(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getChatbotHtttpDash(userId, page, token, dispatch);
    }
};