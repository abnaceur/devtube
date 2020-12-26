import axios from "axios/index";

import {
    TRAINING_CHATBOTMSG_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function trainChatBotAIHtttpDash(userId, token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/dashboard/chatbot/trainig/" + userId, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: TRAINING_CHATBOTMSG_DASH,
                payload: res.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: TRAINING_CHATBOTMSG_DASH,
                payload: false,
            })
        });
}

export function trainChatBotAIDash() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await trainChatBotAIHtttpDash(userId, token, dispatch);
    }
};