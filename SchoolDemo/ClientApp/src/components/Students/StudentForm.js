import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import TextInput from '../Common/TextInput';

//ideally this would be in a util file
function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function phoneIsValid (phone) {
    return /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/.test(phone)
}

export default class StudentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            student: props.isNew ? {
                firstName: '',
                lastName: '',
                email: '',
                phone: ''
            } : { ...props.student},
            editMode: !props.isNew,
            errors: {
                firstName: false,
                lastName: false,
                email: false,
                phone: false
            },
            saving: false
        };
    }

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        let { student, errors } = this.state;
        student[field] = value;
        if(field === 'email'){
            errors = {...errors, email: emailIsValid(value) ? false : 'Invalid Email'}
        } else if( field === 'phone'){
            errors = {...errors, phone: phoneIsValid(value) ? false : 'Invalid Phone'}
        } else {
            errors = {...errors, [field]: value ? false : 'Required'}
        }
        return this.setState({ student, errors });
    };


    submit = (event) => {
        event.preventDefault();
        let { student, errors } = this.state;
        if(Object.values(errors).some(item => item !== false) || Object.values(student).some(v => !v)) {
            errors = {
                email: emailIsValid(student.email) ? false : 'Invalid Email',
                phone: phoneIsValid(student.phone) ? false : 'Invalid Phone',
                firstName: student.firstName ? false : 'Required',
                lastName: student.firstName ? false : 'Required'
            };
            return this.setState({ saving: false, errors });
        }
        this.setState({ saving: true });
        this.props.submit(this.state.student);
    };

    render() {
        const { student, errors, saving, editMode } = this.state;
        return (
            <Modal isOpen>
                <form>
                    <ModalHeader toggle={this.props.close}>{editMode ? 'Edit Student' : 'Create Student'}</ModalHeader>
                    <ModalBody>
                    <TextInput
                        name="firstName"
                        label="First Name"
                        value={student.firstName}
                        onChange={this.handleChange}
                        error={errors.firstName}/>
                    <TextInput
                        name="lastName"
                        label="Last Name"
                        value={student.lastName}
                        onChange={this.handleChange}
                        error={errors.lastName}/>
                    <TextInput
                        name="email"
                        label="Email"
                        value={student.email}
                        onChange={this.handleChange}
                        error={errors.email}/>
                    <TextInput
                        name="phone"
                        label="Phone Number"
                        value={student.phone}
                        onChange={this.handleChange}
                        error={errors.phone}/>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submit}>{saving ? 'Saving...' : 'Save'}</Button>{' '}
                        <Button color="secondary" onClick={this.props.close}>Cancel</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );
    };
}
