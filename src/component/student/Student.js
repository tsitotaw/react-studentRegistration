import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import StudentAdd from './add/StudentAdd';
import StudentList from './list/StudentList';
import './Student.css';

const Student = props => {

    const [student, setStudent] = useState({});

    const newStudentHandler = (data) => {
        setStudent(data);
    };
    
    return (
        <Card className="student_card__container">
            <Card.Header>Student Registration</Card.Header>
            <Card.Body>
                <StudentAdd onSave={newStudentHandler}/>
                <StudentList student={student}/>
            </Card.Body>
        </Card>
    );
    
};

export default Student;