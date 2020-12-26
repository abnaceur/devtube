import axios from "axios/index";

import {
    PUT_CHATBOTMSG_DASH
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function editChatbotHtttp(userId, data, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/dashboard/chatbot/edit/" + userId, {chatbot: data}, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: PUT_CHATBOTMSG_DASH,
                payload: res.data,
            })
            setTimeout(() => {
                dispatch({
                    type: PUT_CHATBOTMSG_DASH,
                    payload: "",
                })                    
            }, 40);
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: PUT_CHATBOTMSG_DASH,
                payload: false,
            })
        });
}

export function editChatbotHtttpDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await editChatbotHtttp(userId, data, token, dispatch);
    }
};