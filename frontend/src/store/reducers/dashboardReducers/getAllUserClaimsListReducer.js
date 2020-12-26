import {
    GET_ALL_CLAIMS
} from "../../actions/ActionType";

const initialState = {
    listClaimsDash: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_ALL_CLAIMS:
            return {
                listClaimsDash: action.payload,
            };
        default:
            return state;
    }
}