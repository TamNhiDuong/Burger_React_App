import React, {Component} from 'react';
import classes from './Contact.module.css'; 
import Button from '../../../components/UI/Button/Button'; 
import axios from '../../../axios-orders'; 
import Spinner from '../../../components/UI/Spinner/Spinner';

class Contact extends Component {
    state = {
        name: '',
        address: {
            street: '',
            postCode: '',
        },
        email: '',
        loading: false, 
    }

    orderHandler=(event)=> {
        event.preventDefault();
        console.log('pass data to contact: ', this.props.ingredients, this.props.price); 
        //Change loading to true as orderSummary is about to be shown
       // this.setState({loading: true})
        //alert("You are continuing!")
        //Sending data to Firebase, endpoint: /orders.json. In which 'orders' is random. 
        //order is data object
       const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Tanja',
                address: {
                    street: 'Kilonrinne 10 B36',
                    zipCode: '02610',
                },
                email: 'a1801032@myy.haaga-helia.fi'
            },
            deliveryMethod: 'Foodora'
        }
        axios.post('/orders.json', order)
        .then( response => {
            this.setState({loading: false, purchasing: false});
            this.props.history.push('/'); 
        })
       .catch(error =>{
            this.setState({loading: false, purchasing: false});
        });

    }
    render(){
        let formOrSpinner = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='name'/>
                <input className={classes.Input} type='text' name='street' placeholder='street address'/>
                <input className={classes.Input} type='text' name='postCode' placeholder='post code'/>
                <input className={classes.Input} type='text' name='phone' placeholder='phone number'/>
                <input className={classes.Input} type='text' name='delivery' placeholder='delivery method'/>
                 <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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
export default Contact; 