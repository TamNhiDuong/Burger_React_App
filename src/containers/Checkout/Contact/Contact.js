import React, {Component} from 'react';
import classes from './Contact.module.css'; 
import Button from '../../../components/UI/Button/Button'; 
import axios from '../../../axios-orders'; 
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'; 

import {connect} from 'react-redux'; 

class Contact extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                valid: false,
                touched: false,
                validRules: {
                    required: true,
                }
            },
            street: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street address'
                },
                value: '',
                valid: false,
                touched: false,
                validRules: {
                    required: true,
                }
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                valid: false,
                touched: false,
                validRules: {
                    required: true,
                    minLength: 5,
                    maxLength: 5, 
                }
            },
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
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validRules: {
                    required: true,
                },
                value: '',
                valid: true,
            },
        },
            loading: false, 
            validForm: false,
    }
    inputValidCheck = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid; 
            console.log('rules', rules)
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid; 
    }

    orderHandler=(event)=> {
        event.preventDefault();
        console.log('pass data to contact: ', this.props, this.props.ingredients, this.props.price); 
        this.setState({loading: true})//Change loading to true as orderSummary is about to be shown
        //order is data object  
        const contactFormInfor = {};
        for (let formElementId in this.state.orderForm ) {
            contactFormInfor[formElementId] = this.state.orderForm[formElementId]; 
        }
       const order = {
            ingredients: this.props.ingredientsProps,
            price: Number.parseFloat(this.props.totalPriceProps).toFixed(2),
            contact: contactFormInfor, 
        }
        //Sending data to Firebase, endpoint: /orders.json. In which 'orders' is random. 
        axios.post('/orders.json', order)
        .then( response => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/'); 
        })
       .catch(error =>{
            this.setState({loading: false, purchasing: false});
        });
    }
    inputChangeHandler =(event, id) => {
        const updatedOrderForm= {...this.state.orderForm};
        const updatedFormElement= {...updatedOrderForm[id]};

        updatedFormElement.value = event.target.value;
        updatedOrderForm[id] = updatedFormElement; 
        updatedFormElement.valid = this.inputValidCheck(updatedFormElement.value, updatedFormElement.validRules);
        updatedFormElement.touched = true;
        console.log('updatedForm:', updatedFormElement); 
        
          //Disable button
          let validForm = true;
          for (let id in updatedOrderForm) {
              validForm = updatedOrderForm[id].valid && validForm;
          }
          this.setState({orderForm: updatedOrderForm, validForm: validForm}); 
          console.log('valid status:', validForm); 
        this.setState({orderForm: updatedOrderForm, validForm: validForm}); 
    }
  
    render(){
          //tranform object to array=> render=> mapping 
        const orderFormArray = []; 
        for (let key in this.state.orderForm) {
            orderFormArray.push({
                id: key,
                config: this.state.orderForm[key]
            }); 
  
        }
        let formOrSpinner = (
            <form onSubmit={this.orderHandler}>
                
                {orderFormArray.map(formElement => (
                    <Input key={formElement.id}
                           elementType={formElement.config.elementType} 
                           elementConfig={formElement.config.elementConfig}
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           shouldValidate={formElement.config.validRules}
                           touched= {formElement.config.touched}
                           changed={(event)=> this.inputChangeHandler(event, formElement.id)}/>
                           
                ))}
             
                 <Button btnType="Success" disabled={!this.state.validForm}>ORDER</Button>
               </form>
        )
        if(this.state.loading) {
            formOrSpinner= <Spinner/>; 
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your infor:</h4>
                {formOrSpinner}
               
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        ingredientsProps: state.ingredients,
        totalPriceProps: state.totalPrice,
    };
};
export default connect(mapStateToProps) (Contact); 