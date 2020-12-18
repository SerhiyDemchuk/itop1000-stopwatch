import React, { useState } from 'react';
import Stopwatch from './Stopwatch';

let StopwatchContainer = () => {
    
    const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
    const [status, setStatus] = useState('stopped');
    const [buttonValue, setButtonValue] = useState('Start');
    const [interv, setInterv] = useState();
    
    let seconds = time.s;
    let minutes = time.m;
    let hours = time.h;
    
    let clicksAmount = 0;
    
    const stopWatch = () => {
        seconds++;
        
        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;
            
            if (minutes / 60 === 1) {
                minutes = 0;
                hours++;
            }
        }
        return setTime({ s: seconds, m: minutes, h: hours });
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

    const stopCount = () => {
        clearInterval(interv);
        setTime({ s: 0, m: 0, h: 0 });
    }
    
    const startCount = () => {
        setInterv(setInterval(stopWatch, 1000));
        setButtonValue('Stop');
        setStatus('started');
    }
    
    const waitButtonClick = () => {
        clicksAmount++
        
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
        setButtonValue('Continue');
        setStatus('stopped');
    }

    const resetButtonClick = () => {
        if (status === 'started') {
            stopCount();
            startCount();
        };
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