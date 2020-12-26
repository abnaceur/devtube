import {
    LIST_PRODUCTS_DASH
} from "../../actions/ActionType";

const initialState = {
    listProductsDash: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LIST_PRODUCTS_DASH:
            return {
                listProductsDash: action.payload,
            };
        default:
            return state;
    }
}