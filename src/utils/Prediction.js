import React, { useEffect, useState } from "react"

const Prediction = () => {
    const axios = require('axios');
    const [linesState, setLinesState] = useState([]);
    const boardSize = 10;

    const endpoint = 'https://api-v3.mbta.com/';

    const fetchPrediction = () => {
        const prediction = endpoint + 'predictions'
        + '?filter[stop]=place-north'
        + '&sort=departure_time'
        + '&filter[route_type]=2'
        + '&filter[direction_id]=0'
        + '&include=schedule'
        + '&page[limit]=' + boardSize;

        console.log(`Querying: ${prediction}`);

        axios
            .get(prediction)
            .then(res => {
                console.log(`statusCode: ${res.status}`);
                return res;
            })
            .then(data => {
                setLinesState(data);
            })
            .catch(error => {
                console.error(error);
            })
    }
    useEffect(() => {
        fetchPrediction();
        setInterval(() => {
            fetchPrediction();
        }, 1000 * 60) // refreshes once every minute
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getDepartureTimeFromSchedule = (schedule) => {
        const scheduleID = schedule.data.id;
        for (var i = 0; i < linesState.data.included.length; i++) {
            if (linesState.data.included[i].id === scheduleID) {
                const departure_time = linesState.data.included[i].attributes.departure_time;
                return getDepartureTime(departure_time);
            }
        }
    }

    const getDepartureTime = (time) => {
        if (time == null) {
            return 'UNKNOWN';
        }
        return convertTime(time.slice(11, -9));
    }

    const getDestination = (route) => {
        return route.data.id.slice(3);
    }

    const getTrainNumber = (trip) => {
        var names = trip.data.id.split("-");
        return names[2];
    }

    const getTrackNumber = (stop) => {
        var names = stop.data.id.split("-");
        if (names.length < 3) {
            return "TBD";
        }
        return names[2];
    }

    const getStatus = (attr) => {
        return attr.status;
    }

    const convertTime = (militaryTime) => {
        militaryTime = militaryTime.split(':')

        var hours = Number(militaryTime[0]);
        var minutes = militaryTime[1];

        var standardTime;

        if (hours > 0 && hours <= 12) {
            standardTime = "" + hours;
        } else if (hours > 12) {
            standardTime = "" + (hours - 12);
        } else if (hours === 0) {
            standardTime = "12";
        }

        standardTime += ":" + minutes;
        standardTime += (hours >= 12) ? " PM" : " AM";

        return standardTime;
    }

    try {
        const departure_data = linesState.data.data.slice();
        departure_data.sort((a, b) => (getDepartureTimeFromSchedule(a.relationships.schedule) > getDepartureTimeFromSchedule(b.relationships.schedule)) ? 1 : -1);
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
                    {departure_data.map(line => {
                        return (
                            <tr>
                                <td>{getDepartureTimeFromSchedule(line.relationships.schedule)} &emsp;</td>
                                <td>{getDestination(line.relationships.route)} &emsp;</td>
                                <td>{getTrainNumber(line.relationships.trip)} &emsp;</td>
                                <td>{getTrackNumber(line.relationships.stop)}</td>
                                <td>{getStatus(line.attributes)} &emsp;</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    } catch (error) {
        console.error(error);
    }
}

export default Prediction