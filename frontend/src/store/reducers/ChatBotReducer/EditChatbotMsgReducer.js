import {
    PUT_CHATBOTMSG_DASH
} from "../../actions/ActionType";

const initialState = {
    putChatBotMsg: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case PUT_CHATBOTMSG_DASH:
            return {
                putChatBotMsg: action.payload,
            };

        default:
            return state;
    }
}