import {
    GET_ALL_PRODUCTS
} from "../../actions/ActionType";

const initialState = {
    allProducts: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_PRODUCTS:
            return {
                allProducts: action.payload,
            };

        default:
            return state;
    }
}