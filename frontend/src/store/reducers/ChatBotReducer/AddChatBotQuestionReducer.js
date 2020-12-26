import {
    ADD_CHATBOT_DASH
} from "../../actions/ActionType";

const initialState = {
    addChatBot: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_CHATBOT_DASH:
            return {
                addChatBot: action.payload,
            };

        default:
            return state;
    }
}