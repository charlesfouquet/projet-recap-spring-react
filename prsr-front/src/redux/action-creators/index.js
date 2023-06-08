import axios from 'axios';

export const updateUser = (userID) => {
    return async (dispatch) => {
        return axios.get("http://localhost:8080/"+userID).then(response => {
            dispatch({
                type: "update",
                payload: response.data
            })
        })
        }
    }

export const resetUser = () => {
    return (dispatch) => {
        dispatch({
            type: "reset",
            payload: 0
        })
    }
}