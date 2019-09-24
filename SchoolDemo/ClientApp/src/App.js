import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import StudentList from './components/Students/StudentList';
import TestList from './components/Tests/TestList';

export default class App extends Component {
    render () {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/students' component={StudentList} />
                <Route path='/tests' component={TestList} />
            </Layout>
        );
    }
}
