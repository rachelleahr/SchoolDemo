import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import StudentForm from "./StudentForm";

export default class StudentList extends Component {

  constructor (props) {
    super(props);
    this.state = {
        students: [],
        editingStudent: {},
        addMode: false,
        editMode: false,
        loading: true
    };
  }

  componentDidMount(){
      this.fetchStudents();
  }

  fetchStudents = async () => {
      const result = await axios.get('api/Students');
      this.setState({ students: result.data, loading: false });
  };

  addStudent = () =>{
      this.setState({ addMode: true })
  };

  saveNewStudent = async student => {
      const result = await axios.post('api/Students', student);
      //for prod, would do a bit of error handling just in case this fails
      this.setState(({students}) => ({ students: [...students, result.data], addMode: false}))
  };

  editStudent = (id) =>{
      this.setState(({students})=>({ editMode: true, editingStudent: students.find(s=>s.id===id)}));
  };

  updateStudent = async student => {
      await axios.put(`api/Students/${student.id}`, student);
      //for prod, would do a bit of error handling just in case this fails
      this.setState(({students}) => ({
          students: students.map(s => s.id === student.id ? student : s),
          editMode: false
      }))
  };

  deleteStudent = async id =>{
      //should add a confirm delete modal and error handling
      await axios.delete(`api/Students/${id}`);
      this.setState(({students}) => ({ students: students.filter(s => s.id !== id)}));
  };

  renderStudentsTable = (students) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {students.map(student =>
            <tr key={student.id} >
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td onClick={()=>this.editStudent(student.id)}>Edit</td>
              <td onClick={()=>this.deleteStudent(student.id)}>Delete</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render () {
      const { students, loading, addMode, editMode, editingStudent } = this.state;
    return (
      <div>
        <h1>Students</h1>
          <Button
              className="float-right"
              onClick={this.addStudent}
          >
              Add
          </Button>
          {addMode && <StudentForm
              isNew
              close={()=>this.setState({ addMode: false})}
              submit={this.saveNewStudent}
          />}
          {editMode && <StudentForm
              student={editingStudent}
              close={()=>this.setState({ editMode: false, editingStudent: {}})}
              submit={this.updateStudent}
          />}
          {loading ? <p><em>Loading...</em></p>
            : this.renderStudentsTable(students)}
      </div>
    );
  }
}
