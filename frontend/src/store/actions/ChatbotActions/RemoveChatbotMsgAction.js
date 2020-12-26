import axios from "axios/index";

import {
    DEL_CHATBOTMSG_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function delChatbotHtttpDash(userId, botId, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/chatbot/del/" + userId, {botId}, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: DEL_CHATBOTMSG_DASH,
                payload: res.data,
            })
            setTimeout(() => {
                dispatch({
                    type: DEL_CHATBOTMSG_DASH,
                    payload: "",
                })                    
            }, 40);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: DEL_CHATBOTMSG_DASH,
                payload: false,
            })
        });
}

export function delChatbotMsgDash(botId) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await delChatbotHtttpDash(userId, botId, token, dispatch);
    }
};