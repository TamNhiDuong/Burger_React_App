import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, localId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId, 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    }
}

export const authLogOut = () => {
    return {
        type: actionTypes.AUTH_LOGOUT, 
    }
}

export const authCheckTimeOut = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut())
        }, timeout* 1000);
    }
};


export const auth = (email, password, isSignup) =>{
    return dispatch=> {
        dispatch(authStart());
        const authData= {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDY8julHxfnkiFyqJhl30wYVTxmlLs-S5g';
        if(!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDY8julHxfnkiFyqJhl30wYVTxmlLs-S5g';
        }
        axios.post(url, authData)
       .then(response => {
           console.log(response);
           dispatch(authSuccess(response.data.idToken, response.data.localId));
           dispatch(authCheckTimeOut(response.data.expiresIn)); 
       })
       .catch(err=> {
           dispatch(authFail(err.response.data.error))
       }); 
    }}
