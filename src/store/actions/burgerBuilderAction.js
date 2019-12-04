import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'; 

export const addIngredients = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingType: value
    }
}

export const removeIngredients = (value) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingType: value
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
}
export const fetchFailed = () => {
    return {
        type: actionTypes.FETCH_FAILED
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-app-d20bc.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchFailed()); 
    }); 
    }
}