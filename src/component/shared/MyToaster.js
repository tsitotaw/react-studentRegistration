import { useState } from "react";
import { Toast } from "react-bootstrap";


const MyToaster = (props) => {
    const [show, setShow] = useState(false);
    return (
        <Toast className="d-inline-block m-1" 
        bg={props.variant || 'success'} key={props.idx || 0}
        onClose={() => setShow(false)} show={show} delay={1000} autohide>
            <Toast.Header>
                <strong className="me-auto">{props.title || 'Message'}</strong>
                <small>{ props.subTitle || 'toaster'}</small>
            </Toast.Header>
            <Toast.Body className={props.variant === 'Dark' && 'text-white'}>
                {props.message || 'toaster message goes here'}
            </Toast.Body>
        </Toast>
    )
}

export default MyToaster;