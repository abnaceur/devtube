import {
    GET_ALL_MEMBERS_DASH
} from "../../actions/ActionType";

const initialState = {
    allMemebersDash: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_MEMBERS_DASH:
            return {
                allMemebersDash: action.payload,
            };

        default:
            return state;
    }
}