import {
    TRAINING_CHATBOTMSG_DASH
} from "../../actions/ActionType";

const initialState = {
    trainingChatBot: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case TRAINING_CHATBOTMSG_DASH:
            return {
                trainingChatBot: action.payload,
            };

        default:
            return state;
    }
}