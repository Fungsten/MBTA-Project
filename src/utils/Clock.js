import React, { useEffect, useState } from 'react'

function Clock() {
    const [clockState, setClockState] = useState();

    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setClockState(date.toLocaleTimeString());
        }, 1000);
    }, []);

    return (
        <div>
            {clockState}
        </div>
    )
}

export default Clock