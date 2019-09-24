import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import { format } from 'date-fns';
import TestForm from "./TestForm";

export default class TestList extends Component {

    constructor (props) {
        super(props);
        this.state = {
            tests: [],
            editingTest: {},
            addMode: false,
            editMode: false,
            loading: true
        };
    }

    componentDidMount(){
        this.fetchTests();
    }

    fetchTests = async () => {
        const result = await axios.get('api/Tests');
        this.setState({ tests: result.data, loading: false });
    };

    addTest = () =>{
        this.setState({ addMode: true })
    };

    saveNewTest = async test => {
        const result = await axios.post('api/Tests', test);
        //for prod, would do a bit of error handling just in case this fails
        this.setState(({tests}) => ({ tests: [...tests, result.data], addMode: false}))
    };

    editTest = (id) =>{
        this.setState(({tests})=>({ editMode: true, editingTest: tests.find(s=>s.id===id)}));
    };

    updateTest = async test => {
        await axios.put(`api/Tests/${test.id}`, test);
        //for prod, would do a bit of error handling just in case this fails
        this.setState(({tests}) => ({
            tests: tests.map(s => s.id === test.id ? test : s),
            editMode: false
        }))
    };

    deleteTest = async id =>{
        //should add a confirm delete modal and error handling
        await axios.delete(`api/Tests/${id}`);
        this.setState(({tests}) => ({ tests: tests.filter(s => s.id !== id)}));
    };

    renderTestsTable = (tests) => {
        return (
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Student</th>
                    <th>Subject</th>
                    <th>Grade</th>
                    <th>Date</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tests.map(test =>
                    <tr key={test.id} >
                        <td>{`${test.student.firstName} ${test.student.lastName}`}</td>
                        <td>{test.subject}</td>
                        <td>{test.grade}%</td>
                        <td>{format(new Date(test.testDate), 'PP')}</td>
                        <td onClick={()=>this.editTest(test.id)}>Edit</td>
                        <td onClick={()=>this.deleteTest(test.id)}>Delete</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render () {
        const { tests, loading, addMode, editMode, editingTest } = this.state;
        return (
            <div>
                <h1>Tests</h1>
                <Button
                    className="float-right"
                    onClick={this.addTest}
                >
                    Add
                </Button>
                {addMode && <TestForm
                    isNew
                    close={()=>this.setState({ addMode: false})}
                    submit={this.saveNewTest}
                />}
                {editMode && <TestForm
                    test={editingTest}
                    close={()=>this.setState({ editMode: false, editingTest: {}})}
                    submit={this.updateTest}
                />}
                {loading ? <p><em>Loading...</em></p>
                    : this.renderTestsTable(tests)}
            </div>
        );
    }
}
