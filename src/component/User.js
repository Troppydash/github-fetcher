import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import {Button, Card, Col, Container, Dropdown, Row, Switch} from "react-bootstrap";
import moment from "moment";
import './User.css'

const sortingMethods = {
    'A-Z': (r1, r2) => {
        if (r1.name < r2.name) {
            return -1;
        } else if (r1.name > r2.name) {
            return 1;
        }
        return 0;
    },
    'Z-A': (r1, r2) => {
        if (r1.name > r2.name) {
            return -1;
        } else if (r1.name < r2.name) {
            return 1;
        }
        return 0;
    },
    'New-Old': (r1, r2) => {
        if (r1.created_at > r2.created_at) {
            return -1;
        } else if (r1.created_at < r2.created_at) {
            return 1;
        }
        return 0;
    },
    'Old-New': (r1, r2) => {
        if (r1.created_at < r2.created_at) {
            return -1;
        } else if (r1.created_at > r2.created_at) {
            return 1;
        }
        return 0;
    }
};

function User() {

    const {username} = useParams() || '';
    const [status, setStatus] = useState('');
    const [data, setData] = useState([]);
    const [err, setError] = useState(undefined);
    const [sortingMethod, setSortingMethod] = useState('A-Z');

    function fetchItems() {
        setStatus("Fetching!");
        Axios.get(`https://api.github.com/users/${username}/repos`)
            .then(res => {
                setData(res.data);
                setStatus("Success!");
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
        }, 10000000);

        return () => {
            loop = undefined;
        }

    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col className="text-center">
                        <h1>Showing Results for User: {username}</h1>
                        {
                            err ? (
                                <h3 className="text-danger">{JSON.stringify(err)}</h3>
                            ) : (
                                <h3>Status: {status}</h3>
                            )
                        }
                    </Col>
                </Row>
                <Row>
                    <Col className="text-right">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    Object.keys(sortingMethods).map(method => {
                                        return <Dropdown.Item
                                            onClick={() => setSortingMethod(method)}>{method}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <Row>
                    <div>
                        {
                            (status === "Fetching!" && data.length < 1) ? <p className="loading">Loading</p> : ''
                        }
                    </div>
                    <Col>
                        {
                            data ? data.sort(sortingMethods[sortingMethod]).map(repo => {
                                return <CardItem repo={repo}/>
                            }) : ''
                        }
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

const CardItem = (props) => {
    const {name, html_url, created_at, updated_at, language, owner, languages_url} = props.repo;
    return (
        <Card style={{width: "75%", margin: "0 auto"}}>
            <Card.Body>
                <Row>
                    <Col xs={6}>
                        <Card.Title><a href={html_url} target="_blank">{name} / {language}</a></Card.Title>
                        <Row>
                            <Col xs="auto">
                                <Card.Img variant="top" src={owner.avatar_url}
                                          style={{width: "100px", height: 'auto'}}></Card.Img>
                            </Col>
                            <Col className="p-2">
                                <Card.Text>
                                    Created {moment(created_at).fromNow()}
                                </Card.Text>
                                <Card.Text>
                                    Last Updated {moment(updated_at).fromNow()}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        <h5>Languages</h5>
                        <a href={languages_url} target="_blank">{languages_url}</a>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )
};

export default User;