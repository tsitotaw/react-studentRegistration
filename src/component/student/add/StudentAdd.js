import './StudentAdd.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import MyToaster from '../../shared/MyToaster';
import { render } from '@testing-library/react';
import Alert from 'react-bootstrap/Alert';

const StudentAdd = props => {

    const [name, setName] = useState('');
    const [alertMessage, setAlertMessage] = useState('New Student Saved Successfully!');
    const [invalidName, setInvalidName] = useState(false);
    const [savedSuccessfully, setSavedSuccessfully] = useState(false);

    const addButtonHandler = (event) => {
        event.preventDefault();
        setInvalidName(false);

        if(name.trim() === ""){
            setInvalidName(true);
            return false;
        }

        setName("");
        
        axios.post("http://localhost:8081/students", {
            name: name
        }).then(res => {
            props.onSave(res.data);
            setAlertMessage('New Student Saved Successfully!');
            setSavedSuccessfully(true);
            setTimeout(() => {
                setSavedSuccessfully(false);
            }, 2000);
            
        });
    }

    const nameChangeHandler = (event) => {        
        setName(event.target.value);
    }

    return (
        <>
        <form onSubmit={addButtonHandler} noValidate>
            {savedSuccessfully && <Alert variant="success">{ alertMessage }</Alert>}
            <Row className="g-2">
                <Col md>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> Student Name </Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" required value={name} onChange={nameChangeHandler} />
                        {invalidName && <Form.Text className="error__label"> Please enter Student Name </Form.Text> }
                    </Form.Group>
                </Col>
                <Col md className="align-center">
                    <Button variant="primary" type="submit">
                        Add New Student
                    </Button>
                </Col>
            </Row>
        </form>
        </>
    );

};

export default StudentAdd;

