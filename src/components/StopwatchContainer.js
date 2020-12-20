import React, { useState } from 'react';
import Stopwatch from './Stopwatch';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

const StopwatchContainer = () => {

    const initialState = { h: 0, m: 0, s: 0 };

    const [time, setTime] = useState(initialState);
    const [status, setStatus] = useState('stopped');
    const [buttonValue, setButtonValue] = useState('Start');
    const [interv, setInterv] = useState();
    const [subscription, setSubscription] = useState();
    let [clicksAmount, setClicksAmount] = useState(0);

    let { h: hours, m: minutes, s: seconds } = time;

    const turnOnStopwatch = () => {
        const timeCount = of(time).pipe(
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
                return setTime({ h: hours, m: minutes, s: seconds });
            })
        );
        setSubscription(timeCount.subscribe());
    }

    const startStopButtonClick = () => {
        if (status !== 'started') {
            startCount();
        }
        if (status === 'started') {
            stopCount();
            setButtonValue('Start');
        }
    }

    const startCount = () => {
        setStatus('started');
        setInterv(setInterval(turnOnStopwatch, 1000));
        setButtonValue('Stop');
    }

    const stopCount = () => {
        setButtonValue('start');
        setStatus('stopped');
        setTime(initialState);
        setInterv(clearInterval(interv));
        setSubscription(subscription.unsubscribe());
    }

    const waitButtonClick = () => {
        setClicksAmount(clicksAmount++);

        if (clicksAmount === 1) {
            setTimeout(() => {
                if (clicksAmount === 2) {
                    freezeCount();
                }
                setClicksAmount(0);
            }, 300);
        }
    }

    const freezeCount = () => {
        setInterv(clearInterval(interv));
        setButtonValue('Start');
        setStatus('paused');
    }

    const resetButtonClick = () => {
        if (status !== 'stopped') {
            seconds = 0;
            minutes = 0;
            hours = 0;
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