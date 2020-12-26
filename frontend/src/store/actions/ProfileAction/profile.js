import axios from "axios";
import {
    UPDATE_PROFILE,
} from '../ActionType';

import { removeToken } from '../../handlers/notAuthorizedHandler';

export function uploadProfile(data) {
    const token = localStorage.getItem("token");

    return async function (dispatch) {
        const dataHttp = new FormData()

        dataHttp.append('firstname', data.firstname);
        dataHttp.append('lastname', data.lastname);
        dataHttp.append('email', data.email);
        dataHttp.append('degree', data.degree);
        dataHttp.append('linkedin', data.linkedin);
        dataHttp.append('gitlab', data.gitlab);
        dataHttp.append('website', data.website);
        dataHttp.append('note', data.note);
        dataHttp.append('companyPosition', data.companyPosition);
        dataHttp.append('location', data.location);

        for (let i = 0; i < data.x.length; i++) {
            dataHttp.append('skillsId' + i, data.x[i].id);
            dataHttp.append('skillsLabel' + i, data.x[i].label);
            dataHttp.append('skillsRang' + i, data.x[i].rang);
        }
        dataHttp.append('userId', data.userData.userId);
        if (typeof (data.cv) === "object")
           await dataHttp.append('file', data.cv, data.cv.name)

        axios.put(process.env.REACT_APP_API_URL + "/users/profile", dataHttp, {
            headers: {
                "Authorization": `Bearer ` + token
            }
        }).then(results => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: results
            })
            setTimeout(() => {
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: ""
                })
            }, 10)
        }).catch(err => {
            removeToken()
            dispatch({
                type: UPDATE_PROFILE,
                payload: "error"
            })
        })
    }
};