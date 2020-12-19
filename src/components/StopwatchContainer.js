import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import {map} from 'rxjs/operators';
import {of} from 'rxjs';

let StopwatchContainer = () => {

    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
    const [status, setStatus] = useState('stopped');
    const [buttonValue, setButtonValue] = useState('Start');
    const [interv, setInterv] = useState();
    
    let hours = time.h;
    let minutes = time.m;
    let seconds = time.s;
    
    let clicksAmount = 0;

    let times = of(time).pipe(
        map(() => {
            seconds++;

            if (seconds / 60 === 1) {
                seconds = 0;
                minutes++;
                
                if (minutes / 60 === 1) {
                    minutes = 0;
                    hours++;
                }
            }
            console.log(seconds);
            return setTime({ h: hours, m: minutes, s: seconds });
        })
    );
    
    const stopWatch = () => {
        times.subscribe();
        // seconds++;

        // if (seconds / 60 === 1) {
        //     seconds = 0;
        //     minutes++;
            
        //     if (minutes / 60 === 1) {
        //         minutes = 0;
        //         hours++;
        //     }
        // }
        // return setTime({ h: hours, m: minutes, s: seconds });
    }

    const startStopButtonClick = () => {
        if (status === 'stopped') {
            startCount();
            setStatus('started');
        }
        if (status === 'started') {
            stopCount();
            setButtonValue('Start');
            setStatus('stopped');
        }
    }

    const startCount = () => {
        // times.subscribe();
        setInterv(setInterval(stopWatch, 1000));
        setButtonValue('Stop');
        setStatus('started');
    }
    
    const stopCount = () => {
        clearInterval(interv);
        setTime({ h: 0, m: 0, s: 0 });
    }
    
    const waitButtonClick = () => {
        clicksAmount++;
        
        if (clicksAmount === 1) {
            setTimeout(() => {
                if (clicksAmount === 2) {
                    freezeCount();
                }
                clicksAmount = 0;
            }, 300);
        }
    }

    const freezeCount = () => {
        clearInterval(interv);
        setButtonValue('Start');
        setStatus('stopped');
    }

    const resetButtonClick = () => {
        if (status === 'started') {
            stopCount();
            startCount();
        } 
    }

    return (
        <div>
            <Stopwatch
                buttonValue={buttonValue}
                time={time}
                waitButtonClick={waitButtonClick}
                resetButtonClick={resetButtonClick}
                startStopButtonClick={startStopButtonClick}
            />
        </div>
    )
}

export default StopwatchContainer;