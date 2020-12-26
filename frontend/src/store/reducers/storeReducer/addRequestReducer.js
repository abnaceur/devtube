import {
    REQUEST_COURSE
} from "../../actions/ActionType";

const initialState = {
    requestCourse: "",
};


export default function (state = initialState, action) {
    switch (action.type) {

        case REQUEST_COURSE:
            return {
                requestCourse: action.payload,
            };

        default:
            return state;
    }
}