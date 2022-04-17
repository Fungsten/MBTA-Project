import React, { useEffect, useState } from 'react'

/*
Yeah, this is a clock, nothing special. Includes MM/DD/YYYY.
*/
function Clock() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleString());
        }, 1000); // update once a second
    }, []);

    return (
        <div>
            {clockState}
        </div>
    )
}

export default Clock