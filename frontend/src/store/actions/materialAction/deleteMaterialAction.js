import axios from "axios/index";
import {
    DELETE_MATERIAL,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

function delMaterial(materialId, token, dispatch) {

    axios.put(process.env.REACT_APP_API_URL + "/materials/delete/" + materialId, {
        headers: {
            "Authorization": `Bearer ` + token
        },
    })
        .then(results => {
            dispatch({
                type: DELETE_MATERIAL,
                payload: true,
            })
        
        })
        .catch(err => {
            removeToken();
            dispatch({
                type: DELETE_MATERIAL,
                payload: false,
            })
        });
}

export function removeMaterial(materialId) {
    const token = localStorage.getItem("token");
    
    return async function (dispatch) {
        await delMaterial(materialId, token, dispatch);
    }

};