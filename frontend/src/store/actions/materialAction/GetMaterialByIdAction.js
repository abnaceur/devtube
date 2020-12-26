import axios from "axios/index";

import {
    GET_MATERIAL_BY_ID
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function getMatById(id, token, dispatch) {

    axios.get(process.env.REACT_APP_API_URL + "/materials/" + id, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(res => {
            dispatch({
                type: GET_MATERIAL_BY_ID,
                payload: res.data.data,
            })
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: GET_MATERIAL_BY_ID,
                payload: false,
            })
        });
}

export function getMatByIdAction(id) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        await getMatById(id, token, dispatch);
    }
};