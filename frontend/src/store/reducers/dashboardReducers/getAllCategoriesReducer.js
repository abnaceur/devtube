import {
    LIST_CATEGORIES_DASH
} from "../../actions/ActionType";

const initialState = {
    listCategoriesDash: [],
};


export default function (state = initialState, action) {
    switch (action.type) {

        case LIST_CATEGORIES_DASH:
            return {
                listCategoriesDash: action.payload,
            };
        default:
            return state;
    }
}