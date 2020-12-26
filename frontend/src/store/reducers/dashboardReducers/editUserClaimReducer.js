import {
    EDIT_CLAIM_DASH
} from "../../actions/ActionType";

const initialState = {
    editClaim: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case EDIT_CLAIM_DASH:
            return {
                editClaim: action.payload,
            };

        default:
            return state;
    }
}