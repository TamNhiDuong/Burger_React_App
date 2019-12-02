import * as actionTypes from './actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
}

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                
            }
    }

}
export default reducer; 