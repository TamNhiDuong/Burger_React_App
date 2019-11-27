import React, {Component} from 'react';
import classes from './Contact.module.css'; 
import Button from '../../../components/UI/Button/Button'; 
class Contact extends Component {
    state = {
        phone: '',
        email: '',
        address: {
            street: '',
            postCode: '',
        }
    }

    orderHandler=(event)=> {
        event.preventDefault();
        console.log('pass data to contact: ', this.props.ingredients, this.props.price); 

    }
    render(){
        return (
            <div className={classes.ContactData}>
                <h4>Enter your infor:</h4>
               <form>
                <input className={classes.Input} type='text' name='phone' placeholder='phone number'/>
                <input className={classes.Input} type='text' name='email' placeholder='email address'/>
                <input className={classes.Input} type='text' name='street' placeholder='street address'/>
                <input className={classes.Input} type='text' name='postCode' placeholder='post code'/>
             
             <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>

               </form>
            </div>

        )
    }
}
export default Contact; 