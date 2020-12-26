import {
    ADD_CAT_DASH
} from "../../actions/ActionType";

const initialState = {
    addCat: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case ADD_CAT_DASH:
            return {
                addCat: action.payload,
            };

        default:
            return state;
    }
}