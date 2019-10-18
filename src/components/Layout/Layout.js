import React, {Component} from 'react'; 
import Aux from '../../hoc/Aux'; 
import './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
//statefull class to set true false for having Backdrop or not

class Layout extends Component {
    state = {
        sideDrawerOpen: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({sideDrawerOpen: false})
    };
    //Do not write: this.state({sideDrawerOpen: !this.state.sideDrawerOpen})
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen};
        });
    }
    render() {
        return (
    <Aux>
        <SideDrawer open={this.state.sideDrawerOpen} close={this.sideDrawerCloseHandler}/>
        <Toolbar sideDrawerToggleHandler={this.sideDrawerToggleHandler}/>
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className="Content">
              {this.props.children}
        </main>
    </Aux>

        )
    }
}
export default Layout; 