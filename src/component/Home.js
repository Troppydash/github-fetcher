import React, {useState} from "react";
import {} from 'react-bootstrap';
import {Container} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";

function Home() {
    const [input, setInput] = useState('');

    return (
        <Container>
            <div className="text-center m-5">
                <h1>Github Fetcher</h1>

                <Form className="text-left" action={`/user/${input}`} method="get">
                    <Form.Group controlId="userSearch">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" value={input} onChange={e => setInput(e.target.value)}/>
                    </Form.Group>
                    <Button variant="outline-primary" type="submit">
                        Search
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default Home;