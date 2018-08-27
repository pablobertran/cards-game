import React from 'react';
import Auxiliar from '../../../hoc/Auxiliar/Auxiliar'
import Backdrop from '../Backdrop/Backdrop';
import classes from './Spinner.css';

const spinner = () => (
    <Auxiliar>
        <Backdrop show={true} clicked={null}></Backdrop>
        <div className={classes["sk-folding-cube"]}>
            <div className={[classes["sk-cube"], classes["sk-cube1"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube2"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube4"]].join(' ')}></div>
            <div className={[classes["sk-cube"], classes["sk-cube3"]].join(' ')}></div>
        </div>
    </Auxiliar>
);

export default spinner;