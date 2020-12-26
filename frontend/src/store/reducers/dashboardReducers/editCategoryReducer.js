import {
    EDIT_CATEGORY_DASH
} from "../../actions/ActionType";

const initialState = {
    editCategory: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case EDIT_CATEGORY_DASH:
            return {
                editCategory: action.payload,
            };

        default:
            return state;
    }
}