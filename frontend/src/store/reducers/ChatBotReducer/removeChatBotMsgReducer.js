import {
    DEL_CHATBOTMSG_DASH
} from "../../actions/ActionType";

const initialState = {
    delChatBotMsg: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case DEL_CHATBOTMSG_DASH:
            return {
                delChatBotMsg: action.payload,
            };

        default:
            return state;
    }
}