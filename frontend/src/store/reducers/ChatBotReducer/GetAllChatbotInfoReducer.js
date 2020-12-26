import {
    LIST_CHATBOTMSG_DASH
} from "../../actions/ActionType";

const initialState = {
    listChatBot: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LIST_CHATBOTMSG_DASH:
            return {
                listChatBot: action.payload,
            };

        default:
            return state;
    }
}