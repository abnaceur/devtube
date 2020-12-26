import axios from "axios/index";
import {
    ADD_CHATBOT_DASH,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function chatBotSendDataDash(userId, token, dispatch, data) {
    axios.post(process.env.REACT_APP_API_URL + "/dashboard/chatbot/" + userId, data, {
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: ADD_CHATBOT_DASH,
                payload: results.data,
            })
            
            setTimeout(() => {
                dispatch({
                    type: ADD_CHATBOT_DASH,
                    payload: "",
                })
            }, 30);

        })
        .catch(err => {
            removeToken();
            dispatch({
                type: ADD_CHATBOT_DASH,
                payload: false,
            })
        });
}

export function addChatBotDash(data) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    
    return async function (dispatch) {
        await chatBotSendDataDash(userId, token, dispatch, data)
    }
};