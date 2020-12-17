import React from 'react';
import s from './Stopwatch.module.scss';

let Stopwatch = (props) => {
    // debugger;
    return (
        <div className={s.container}>

            <div className={s.display}>
                {/* {props.display} */}
                {props.stopWatch()}
            </div>

            <div className={s.buttons}>
                <button onClick={props.startOrStopButtonClick}>{props.buttonStartStop}</button>
                <button onClick={props.waitButtonClick}>Wait</button>
                <button onClick={props.resetButtonClick}>Reset</button>
            </div>

        </div>
    )
};

export default Stopwatch;