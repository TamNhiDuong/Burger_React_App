import React from 'react'; 
import Aux from '../../hoc/Aux'; 
import './layout.css';

const layout = (props) => (
    <Aux>
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className="Content">
              {props.children}
        </main>
    </Aux>
);
export default layout; 