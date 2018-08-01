import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Spinner.css';

const spinner = () => (
    <Aux>
        <Backdrop show={true} clicked={null}></Backdrop>
        <div className={classes["sk-folding-cube"]}>
            <div className={[classes["sk-cube"], classes["sk-cube1"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube2"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube4"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube3"]].join(' ')}></div>
        </div>
    </Aux>
);

export default spinner;