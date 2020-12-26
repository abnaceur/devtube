import {
    GET_MATERIAL_BY_ID    
} from "../../actions/ActionType";

const initialState = {
    getMaterialById: {},
};


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_MATERIAL_BY_ID:
            return {
                getMaterialById: action.payload,
            };
        default:
            return state;
    }
}