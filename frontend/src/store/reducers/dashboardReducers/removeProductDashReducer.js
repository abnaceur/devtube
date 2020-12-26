import {
    RM_PRODUCT_DASH
} from "../../actions/ActionType";

const initialState = {
    rmProduct: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case RM_PRODUCT_DASH:
            return {
                rmProduct: action.payload,
            };

        default:
            return state;
    }
}