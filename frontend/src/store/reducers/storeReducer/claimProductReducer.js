import {
    CLAIM_PRODUCT
} from "../../actions/ActionType";

const initialState = {
    claimProduct: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case CLAIM_PRODUCT:
            return {
                claimProduct: action.payload,
            };

        default:
            return state;
    }
}