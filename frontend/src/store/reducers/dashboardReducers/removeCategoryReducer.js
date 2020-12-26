import {
    RM_CATEGORY_DASH
} from "../../actions/ActionType";

const initialState = {
    rmCategory: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case RM_CATEGORY_DASH:
            return {
                rmCategory: action.payload,
            };

        default:
            return state;
    }
}