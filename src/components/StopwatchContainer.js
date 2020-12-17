import React from 'react';
import Stopwatch from './Stopwatch';

let StopwatchContainer = () => {

    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    let displaySeconds = 0;
    let displayMinutes = 0;
    let displayHours = 0;

    let clicksAmount = 0;
    let status = 'stopped';
    let interval = null;

    let buttonStartStop = 'Start';
    // let display = '00:00:00';

    let stopWatch = () => {
        let display;
        seconds++;

        if (seconds / 60 === 1) {
            seconds = 0;
            minutes++;

            if (minutes / 60 === 1) {
                minutes = 0;
                hours++;
            }
        }

        if (seconds < 10) {
            displaySeconds = '0' + seconds.toString();
        } else {
            displaySeconds = seconds;
        }

        if (minutes < 10) {
            displayMinutes = '0' + minutes.toString();
        } else {
            displayMinutes = minutes;
        }

        if (hours < 10) {
            displayHours = '0' + hours.toString();
        } else {
            displayHours = hours;
        }

        display = displayHours + ':' + displayMinutes + ':' + displaySeconds;
        console.log(display);

        return (
            <div>
                <div>{display}</div>
            </div>
        )
    }

    let startOrStopButtonClick = () => {

        if (status === 'stopped') {
            startCount();
            status = 'started';
        } else {
            stopCount();
            buttonStartStop = 'Start';
            status = 'stopped';
        }
    }

    let stopCount = () => {
        clearInterval(interval);
        seconds = 0;
        minutes = 0;
        hours = 0;
        // display = '00:00:00';
    }

    let startCount = () => {
        interval = setInterval(stopWatch, 1000);
        buttonStartStop = 'Stop';
    }

    let resetButtonClick = () => {
        if (status === 'started') {
            stopCount();
            startCount();
        }
    }

    let freezeCount = () => {
        clearInterval(interval);
        buttonStartStop = 'Start';
        status = 'stopped';
    }

    let waitButtonClick = () => {
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

    return (
        <div>
            <Stopwatch
                // display={display}
                stopWatch={stopWatch}
                buttonStartStop={buttonStartStop}
                waitButtonClick={waitButtonClick}
                resetButtonClick={resetButtonClick}
                startOrStopButtonClick={startOrStopButtonClick}
            />
        </div>
    )
}

export default StopwatchContainer;