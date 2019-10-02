import React from 'react'; 

const layout = (props) => (
<div>Toolbar, Side drawer, Backdrop</div>
<main>
    {props.children}
</main>
);