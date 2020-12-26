import axios from "axios/index";
import {
    GET_ALL_MYMATERIAL,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getMyMaterials(token, dispatch, page, userId) {

    axios.get(process.env.REACT_APP_API_URL + "/materials/user/" + userId + "/" + page,{
        headers: {
            "Authorization": `Bearer ` + token
        }
    })
        .then(results => {
            dispatch({
                type: GET_ALL_MYMATERIAL,
                payload: results.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: GET_ALL_MYMATERIAL,
                payload: false,
            })
        });
}

export function getAllMyMaterials(page) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    return async function (dispatch) {
        await getMyMaterials(token, dispatch, page, userId)
    }

};