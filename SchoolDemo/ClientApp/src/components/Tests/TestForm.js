import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import TextInput from '../Common/TextInput';
import SelectInput from '../Common/SelectInput';

export default class TestForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test: props.isNew ? {
                subject: '',
                testDate: '',
                grade: '',
                studentId: ''
            } : { ...props.test},
            studentList: [],
            editMode: !props.isNew,
            errors: {
                subject: false,
                testDate: false,
                grade: false,
                studentId: false
            },
            saving: false
        };
    }

    componentDidMount(){
        this.fetchStudentList();
    }

    fetchStudentList = async () => {
        //in prod would create a separate api with just the name and ID but now I am just reusing the old one
        const result = await axios.get('api/Students');
        this.setState({ studentList: result.data.map(s=>{
            return {
                id: s.id,
                name: `${s.firstName} ${s.lastName}`
            }
        }) });
    };

    handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        let { test, errors } = this.state;
        test[field] = value;
        if(field === 'grade'){
            errors = {...errors, grade: value >= 0 && value <= 100 ? false : 'Grade must be between 0 and 100'}
        } else {
            errors = {...errors, [field]: value ? false : 'Required'}
        }
        return this.setState({ test, errors });
    };

    submit = (event) => {
        event.preventDefault();
        let { test, errors } = this.state;
        if(Object.values(errors).some(item => item !== false) || Object.values(test).some(v => !v)) {
            errors = {
                subject: test.subject ? false : 'Required',
                testDate: test.testDate ? false : 'Required',
                grade: test.grade ? false : 'Required',
                studentId: test.studentId ? false : 'Required'
            };
            return this.setState({ saving: false, errors });
        }
        this.setState({ saving: true });
        this.props.submit({...this.state.test});
    };

    render() {
        const { test, errors, saving, editMode, studentList } = this.state;
        return (
            <Modal isOpen>
                <form>
                    <ModalHeader toggle={this.props.close}>{editMode ? 'Edit Test' : 'Create Test'}</ModalHeader>
                    <ModalBody>
                    <TextInput
                        name="subject"
                        label="Subject"
                        value={test.subject}
                        onChange={this.handleChange}
                        error={errors.subject}/>
                    <TextInput
                        name="grade"
                        label="Grade"
                        value={test.grade}
                        onChange={this.handleChange}
                        type="number"
                        min="0"
                        max="100"
                        error={errors.grade}/>
                    <TextInput
                        name="testDate"
                        label="Date"
                        value={test.testDate}
                        type="date"
                        onChange={this.handleChange}
                        error={errors.testDate}/>
                    <SelectInput
                        name="studentId"
                        label="Student"
                        options={studentList}
                        value={test.studentId}
                        onChange={this.handleChange}
                        error={errors.studentId}/>

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
