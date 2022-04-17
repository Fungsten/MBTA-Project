import React, { useEffect, useState } from "react"

const Prediction = () => {
    const axios = require('axios');
    const [linesState, setLinesState] = useState([]);
    const boardSize = 10;

    const endpoint = 'https://api-v3.mbta.com/';

    const fetchPrediction = () => {
        const prediction = endpoint + 'prediction'
        + '?filter[stop]=place-north'
        + '?sort=departure_time'
        + '?filter[route_type]=2'
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
        }, 1000 * 60 * 15)
    }, [])

    const getDepartureTime = (time) => {
        return time.slice(11, -9);
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
        return names[1];
    }

    const getStatus = (attr) => {
        return attr.status;
    }

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
                                <td>{getDepartureTime(line.attributes.departure_time)} &emsp;</td>
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