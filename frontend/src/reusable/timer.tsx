import React, {useEffect, useState} from "react";
import {Typography} from "@mui/material";

export default function Timer({isReversed, totalCount, onFinish, onReset}) {
    const [timer, setTimer] = useState({
        timer: "",
        startTime: isReversed ? totalCount : 0, //seconds
        count: isReversed ? totalCount : 0, //seconds,
        totalCount: totalCount,
        reverse: isReversed,
        finished: false,
    });

    useEffect(() => {
        if (onReset)
            setTimer({
                timer: "",
                startTime: isReversed ? totalCount : 0, //seconds
                count: isReversed ? totalCount : 0, //seconds,
                totalCount: totalCount,
                reverse: isReversed,
                finished: false,
            });
    }, [onReset]);

    const tick = (state) => {
        if (state.finished) {
            if (onFinish) onFinish();
            return;
        }
        if (state.reverse) {
            const count = state.count - 1;
            if (state.count > 0) {
                setTimer({...timer, count: count, timer: calculateTimer(count)});
            } else {
                setTimer({...timer, count: count, finished: true, timer: ""});
            }
        }
    };

    const calculateTimer = (count) => {
        const min = Math.floor(count / 60);
        const second = count % 60;
        const calculatedMin = min < 10 ? `0${min}:` : `${min}:`;
        const calculatedSecond = second < 10 ? `0${second}` : `${second}`;
        return calculatedMin + calculatedSecond;
    };

    useEffect(() => {
        let interval = null;
        if (!timer.finished)
            interval = setInterval(() => {
                tick(timer);
            }, 1000);
        else {
            clearInterval(interval);
            if (onFinish) onFinish();
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <Typography variant={"body1"} my={2} fontSize={"x-small"}>
            زمان باقی مانده :{timer.timer}
        </Typography>
    );
}