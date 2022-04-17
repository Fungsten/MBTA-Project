import React, { useEffect, useState } from 'react'

function Today() {
    const [todayState, setTodayState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setTodayState(date.toLocaleString());
        }, 1000);
    }, []);

    return (
        <div>
            {todayState}
        </div>
    )
}

export default Today