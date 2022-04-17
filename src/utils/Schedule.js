import React, { useEffect, useState } from "react"

const Schedule = () => {
    const axios = require('axios')
    const [linesState, setLinesState] = useState([]);
    const boardSize = 9;

    const endpoint = 'https://api-v3.mbta.com/';

    const pad = (number) => {
        if (number < 10) {
            return '0' + number;
        } else {
            return '' + number;
        }
    }

    const getYear = (date) => {
        return date.getFullYear();
    }

    const getMonth = (date) => {
        return pad(date.getMonth() + 1); // because js uses 0 = Jan, 1 = Feb, etc.
    }

    const getDay = (date) => {
        return pad(date.getDate());
    }

    const getHour = (date) => {
        return pad(date.getHours() - 6);
    }

    const getMinute = (date) => {
        return pad(date.getMinutes());
    }

    const fetchSchedule = (date) => { 
        const schedule = endpoint + 'schedules'
        + '?filter[stop]=place-north'
        + '&filter[route_type]=2' // 2 for commuter rail
        + '&include=prediction' // need for onTime status
        + '&sort=departure_time'
        + '&filter[date]=' + getYear(date) + '-' + getMonth(date) + '-' + getDay(date)
        + '&filter[min_time]=' + getHour(date) + ':' + getMinute(date)
        + '&filter[direction_id]=0'
        + '&page[limit]=' + boardSize;

        console.log("Querying: " + schedule);

        axios
            .get(schedule)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                // console.log(res)
                return res;
            })
            .then(data => {
                setLinesState(data);
            })
            .catch(error => {
                console.error(error);
            })
    }

    const fetchStatus = (status) => {
        if (status == null) {
            return 'ON TIME';
        } else {
            return status;
        }
    }

    const fetchTrainNumber = (id) => {
        console.log(id);
        const names = id.split("-");
        return names[2];
    }

    useEffect(() => {
        const date = new Date(); // for initial data load, else we'd have to wait 15 minutes
        fetchSchedule(date);
        setInterval(() => {
            const date = new Date();
            fetchSchedule(date);
        }, 1000 * 60 * 15) // refresh data every 15 minutes
    }, [])
    

    try {
        return (
            <div>
                Departures
                <table>
                    <tr>
                        <th>TIME &emsp;</th>
                        <th>DESTINATION &emsp;</th>
                        <th>TRAIN# &emsp;</th>
                        <th>TRACK# &emsp;</th>
                        <th>STATUS &emsp;</th>
                    </tr>
                    {linesState.data.data.map(line => {
                        return (
                            <tr>
                                <td>{line.attributes.departure_time.slice(11, -9)} &emsp;</td>
                                <td>{line.relationships.route.data.id.slice(3)} &emsp;</td>
                                <td>{fetchTrainNumber(line.relationships.trip.data.id)} &emsp;</td>
                                <td>TBD</td>
                                <td>{fetchStatus(line.relationships.prediction.data)} &emsp;</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    } catch (error) {
        console.error(error);
    }
    
};

export default Schedule