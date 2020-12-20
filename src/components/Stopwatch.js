import React from 'react';
import s from './Stopwatch.module.scss';

const Stopwatch = (props) => {
    return (
        <div className={s.container}>

            <div className={s.display}>
                {(props.time.h >= 10) ? props.time.h : '0' + props.time.h}:
                {(props.time.m >= 10) ? props.time.m : '0' + props.time.m}:
                {(props.time.s >= 10) ? props.time.s : '0' + props.time.s}
            </div>

            <div className={s.buttons}>
                <button onClick={props.startStopButtonClick}>{props.buttonValue}</button>
                <button onClick={props.waitButtonClick}>Wait</button>
                <button onClick={props.resetButtonClick}>Reset</button>
            </div>

        </div>
    )
};

export default Stopwatch;