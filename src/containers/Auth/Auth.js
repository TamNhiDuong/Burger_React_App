import React, {Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import {Redirect} from 'react-router-dom'; 

import {connect} from 'react-redux';
import * as actionCreator from '../../store/actions/index'; 

class Auth extends Component {
    state = {
        form: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                valid: false,
                touched: false,
                validRules: {
                    required: true,
                    isEmail: true,
                }
            },

            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                valid: false,
                touched: false,
                validRules: {
                    required: true,
                    minLength: 8
                },
            },
        },
        isSignup: true,   
    }
    inputChangeHandler =(event, id) => {
        const updatedForm= {
            ...this.state.form,
            [id]: {
                ...this.state.form[id], 
                value: event.target.value,
                valid: this.inputValidCheck(event.target.value, this.state.form[id].validRules),
                touched: true
            }
        };
        this.setState({form: updatedForm})
    }
    inputValidCheck = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid; 
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid; 
        }
        return isValid; 
    }
    submitHandler = (event) => {
        //prevent reloading
        event.preventDefault();
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignup); 
    }
    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        })
    }
    componentDidMount(){
        if(!this.props.isBuilding && this.props.redirectLink !== '/'){
            this.props.onChangeAuthRedirectLink('/'); 
        }
    }
    render() {
        const formArray = []; 
        for (let key in this.state.form) {
            formArray.push({
                id: key,
                config: this.state.form[key]
            }); 
        }

        let spinnerOrForm = (
            <form onSubmit={this.submitHandler}>         
            {formArray.map(formElement => (
                <Input key={formElement.id}  
                       elementType={formElement.config.elementType} 
                       elementConfig={formElement.config.elementConfig}
                       value={formElement.config.value}
                       invalid={!formElement.config.valid}
                       shouldValidate={formElement.config.validRules}
                       touched= {formElement.config.touched}
                       changed={(event)=> this.inputChangeHandler(event, formElement.id)}/>
                       
            ))}
             <Button btnType="Success">SUBMIT</Button>
           </form>        
            );
            
        if(this.props.loading) {
            spinnerOrForm= <Spinner/>; 
        }

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (<p>{this.props.error.message}</p>)
        }

        let redirect = null;
        if(this.props.isAuthenticated) {
            redirect = <Redirect to={this.props.redirectLink}/>
        }
     

        return (
            <div className={classes.Auth}>
                {redirect}
                {spinnerOrForm}
                <Button btnType='Danger'
                clicked={this.switchModeHandler}
                >SWITCH TO {this.state.isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
                {errorMessage}
            </div>
        )
    }
}
//REDUX
const mapStateToProps = state => {
    return {
        loading: state.auth.loading, 
        error: state.auth.error, 
        isAuthenticated: state.auth.token !== null, 
        redirectLink: state.auth.authRedirectLink, 
        isBuilding: state.burger.building, 

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth : (email,password, isSignup) => dispatch(actionCreator.auth(email, password, isSignup)),
        onChangeAuthRedirectLink: (link) => dispatch(actionCreator.authRedirectLink(link)), 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);  