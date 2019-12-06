import React, {Component} from 'react';
import Order from '../../components/Order/Order'; 
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'; 

import {connect} from 'react-redux'; 

class OrderContainer extends Component {
    state = {
        orders: [],
        loading: true, 
    }
    componentDidMount(){
        axios.get('/orders.json?auth='+ this.props.token) 
        .then(res => {
            console.log('response for order page:', res.data);
            const fetchedDataArray = [];
            //turn the fetched data-object to array
            for (let key in res.data) {
                fetchedDataArray.push({...res.data[key],
                id: key});
            }
            this.setState({loading: false,  orders: fetchedDataArray});
            console.log('array of fetch data:', fetchedDataArray); 
        })
        .catch(err => {
            this.setState({loading: false}); 
        })      
    }
    render() {
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
                ))}
            </div>
        )
    }

}
const mapStateToProps = state => {
    return {
        token: state.auth.token, 
    }
}
export default connect(mapStateToProps)(withErrorHandler(OrderContainer, axios)); 