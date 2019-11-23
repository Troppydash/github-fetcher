import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";

function User() {

    const {username} = useParams() || '';
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);
    const [err, setError] = useState(undefined);

    function fetchItems() {
        setStatus("Fetching!");
        Axios.get(`https://api.github.com/users/${username}/repos`)
            .then(res => {
                setStatus("Success!");
                setData(res);
            })
            .catch(err => {
                setStatus("Error!");
                setError(err)
            });
    }

    useEffect(() => {
        fetchItems();

        let loop = setInterval(() => {
            fetchItems();
        }, 20000);

        return () => {
            loop = undefined;
        }

    }, []);

    return (
        <div>
            {username}
            {status}
            {JSON.stringify(data)}
        </div>
    )
}

export default User;