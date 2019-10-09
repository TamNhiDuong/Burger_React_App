import React from 'react'; 
import Aux from '../../hoc/Aux'; 
import './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Aux>
        <SideDrawer/>
        <Toolbar/>
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className="Content">
              {props.children}
        </main>
    </Aux>
);
export default layout; 