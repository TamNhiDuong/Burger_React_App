import React from 'react'; 
import Aux from '../../hoc/Aux'; 
import './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'; 

const layout = (props) => (
    <Aux>
        <Toolbar/>
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className="Content">
              {props.children}
        </main>
    </Aux>
);
export default layout; 