import { useCallback, useEffect, useRef, useState } from "react";

export const handleCountDown = (initialTimeInSecond, onDone = null) => { // having onDone optional could make sense
    const [timeLeft, setTimeLeft] = useState(initialTimeInSecond);
    const onDoneRef = useRef();
    // we want the last version of onDone but it should never trigger a restart of the count down
    onDoneRef.current = onDone;
    const intervalRef = useRef();
    const stop = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined; // undefined since you're not doing useRef(null);
        }
    }
    const start = useCallback(() => {
        // here using stop() you're sure you'll never have two intervals 
        // running at the same time... ever
        stop();
        intervalRef.current = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            stop();
            onDoneRef.current?.();
        }
    }, [timeLeft]);

    useEffect(() => {
        start();
        return stop;
    }, [start]);

};