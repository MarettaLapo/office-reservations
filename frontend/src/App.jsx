import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './layout/Header'
import MainPage from "./pages/MainPage";

import OfficeData from "./pages/OfficeData";
import ApplicationsNotion from "./pages/ApplicationsNotion";
import Offices from "./pages/Offices";

import Login from "./components/authorization/Login";
import Register from "./components/authorization/Register";
import Profile from "./components/authorization/Profile";
import { connect } from "react-redux";
import NotFoundPage from "./pages/NotFoundPage";

class App extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path='/' element={<MainPage/>} />
                        <Route path='/notions' element={<ApplicationsNotion/>} />
                        <Route path='/offices' element={<Offices/>} />

                        <Route path="/login" element={<Login/>} />
                        <Route path="/addUser" element={<Register/>} />
                        <Route path="/profile" element={<Profile/>} />

                        <Route path="/office/:id" element={<OfficeData/>} />
                        <Route path="*" element={<NotFoundPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемые страницы данные
function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

// передача данных к другим компонентам
export default connect(mapStateToProps)(App);
