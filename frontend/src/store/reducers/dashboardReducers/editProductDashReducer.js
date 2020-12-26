import {
    EDIT_PRODUCT_DASH
} from "../../actions/ActionType";

const initialState = {
    editProduct: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case EDIT_PRODUCT_DASH:
            return {
                editProduct: action.payload,
            };

        default:
            return state;
    }
}