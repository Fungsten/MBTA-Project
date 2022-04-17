import React, { useEffect, useState } from 'react'

function Today() {
    const [todayState, setTodayState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setTodayState(convertToWeekday(date.getDay()));
        }, 1000);
    }, []);

    const convertToWeekday = (day) => {
        if (day === 0) {
            return "Sunday";
        }
        if (day === 1) {
            return "Monday";
        }
        if (day === 2) {
            return "Tuesday";
        }
        if (day === 3) {
            return "Wednesday";
        }
        if (day === 4) {
            return "Thursday";
        }
        if (day === 5) {
            return "Friday";
        }
        if (day === 6) {
            return "Saturday";
        }
    }

    return (
        <div>
            Today is:
            <br></br>
            {todayState}
        </div>
    )
}

export default Today