import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux'; 
import {Provider} from 'react-redux'; 
import thunk from 'redux-thunk'; 

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/bugerBuilderReducer'; 
import authReducer from './store/reducers/authReducer';
//only show Redux in dev mode 
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burger: burgerBuilderReducer,
    auth: authReducer
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
)); 

ReactDOM.render(<Provider store={store}><App/></Provider> , document.getElementById( 'root' ) );
registerServiceWorker();

