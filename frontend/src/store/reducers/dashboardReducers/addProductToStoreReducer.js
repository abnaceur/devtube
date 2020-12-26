import {
    ADD_PRODUCT_DASH
} from "../../actions/ActionType";

const initialState = {
    addproduct: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_PRODUCT_DASH:
            return {
                addproduct: action.payload,
            };

        default:
            return state;
    }
}