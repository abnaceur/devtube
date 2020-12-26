import {
    UPDATE_MEMBER_DASH
} from "../../actions/ActionType";

const initialState = {
    userUpdated: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case UPDATE_MEMBER_DASH:
            return {
                userUpdated: action.payload,
            };

        default:
            return state;
    }
}