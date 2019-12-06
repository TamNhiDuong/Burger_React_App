import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'; 

import * as actionCreator from '../../store/actions/index'; 

class Logout extends Component {
    componentDidMount(){
        this.props.onLogOut(); 
    }
    render() {
        return <Redirect to='/'/>; 
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(actionCreator.authLogOut()), 
    }
}
export default connect(null, mapDispatchToProps)(Logout); 