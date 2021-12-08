import './StudentList.css';
import { Alert, Table, Form } from 'react-bootstrap';
import { MdOutlineEditCalendar, MdCancel, MdOutlineSave } from 'react-icons/md';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MyModal from '../../shared/MyModal';


const StudentList = props => {

    const [students, setStudent] = useState([]);
    const [updatedName, updateName] = useState('');
    const [deleletePromopt, setDeletePrompt] = useState(false);
    const [alertMessage, setMessageAlert] = useState('Student Name Updated Successfully!');
    const [operationSuccessful, setOperationSuccessful] = useState(false);

    const onDeleteHandler = (id) => {

        setDeletePrompt(true);

        axios.delete(`http://localhost:8081/students/${id}`)
        .then(res => {
            var newList = students.filter(student => student.id !== id);
            setStudent(newList);
            setMessageAlert('Student Deleted Successfully!');
            setOperationSuccessful(true);
            setTimeout(() => {
                setOperationSuccessful(false);
                setDeletePrompt(false);
            }, 2000);
        });
    };
    
    const onEditHandler = (student) => {
        let updatedList = students.map(st => {
            st.isOnEdit = (student.id === st.id) ? true : false;
            return st;
        });
        updateName(student.name);
        setStudent(updatedList);
    };

    const onUpdateHandler = (student) => {
        axios.put(`http://localhost:8081/students/${student.id}`,{
            id: student.id,
            name: updatedName
        })
        .then(res => {
            let updatedList = students.map(st => {
                if((student.id === st.id)){
                    st.isOnEdit =false;
                    st.name = updatedName;
                }
                return st;
            })
            setStudent(updatedList);
            setMessageAlert('Student Name Updated Successfully!');
            setOperationSuccessful(true);
            setTimeout(() => {
                setOperationSuccessful(false);
            }, 2000);
        });
    };

    const updateStudentHandler = (event) =>{
        updateName(event.target.value);
    }

    useEffect(() => {
        axios.get("http://localhost:8081/students").then(res => {
            setStudent(res.data);
        });
    }, []);

    useEffect(() => {
        if(props.student !== ""){
            setStudent(students => [...students, props.student]);
        }
    }, [props.student]);

    return (
        <>
        {operationSuccessful && <Alert variant="success">{ alertMessage }</Alert>} 
        {deleletePromopt && <MyModal />}
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students ? 
                        students.map(student => {
                            return (
                            <tr>
                                <td>{student.id}</td>
                                <td>
                                    { !student.isOnEdit && student.name }
                                    { student.isOnEdit && 
                                    <Form.Control type="text" value={updatedName} onChange={updateStudentHandler} />
                                    }
                                </td>
                                <td>
                                    { !student.isOnEdit && <MdOutlineEditCalendar onClick={(e) => onEditHandler(student)}/>} 
                                    { student.isOnEdit && <MdOutlineSave onClick={(e) => onUpdateHandler(student)} />} 
                                    { !student.isOnEdit && <MdCancel onClick={(e) => onDeleteHandler(student.id)}/> } 
                                </td>
                            </tr>)
                        }) : {}
                    }            
            </tbody>
        </Table>
        </>
    );

};

export default StudentList;

