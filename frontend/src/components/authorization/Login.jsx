import React from 'react';
import {Navigate, Link} from 'react-router-dom';

import {connect} from "react-redux";
import auth from "../../actions/auth";
import {Button, createTheme, FormControl, FormLabel, Paper, TextField, ThemeProvider} from "@mui/material";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: undefined
        };
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({loading: true});

        const {dispatch} = this.props;

        dispatch(auth.login(this.state.username, this.state.password))
            .then(() => {
                window.location.reload();
            })
            .catch(() => {
                this.setState({loading: false});
            });
    }

    render() {
        const {isLoggedIn, message} = this.props;

        if (isLoggedIn) {
            return <Navigate to="/profile"/>;
        }

        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Paper elevation={3} className="m-5">
                    <form onSubmit={this.handleLogin} className="mx-5 mb-4 mt-4">
                        <h3>Войти в аккаунт</h3>
                        <div className="form-group mt-4">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="username">Логин</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="username"
                                           value={this.state.username}
                                           onChange={this.onChangeUsername}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="password">Пароль</FormLabel>
                                <TextField required type="password"
                                           id="standard-basic"
                                           variant="standard"
                                           name="password"
                                           value={this.state.password}
                                           onChange={this.onChangePassword}/>
                            </FormControl>
                        </div>

                        <div className="form-group mt-2">
                            <ThemeProvider theme={createTheme({
                                palette: {
                                    primary: {
                                        main: '#519E8A'
                                    },
                                },
                            })}>
                                <Button type="submit" variant="contained" color="primary" disabled={this.state.loading}>
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Войти</span>
                                </Button>
                            </ThemeProvider>
                        </div>
                        {message && this.state.loading !== undefined && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </Paper>
            </div>
        );
    }
}

// функциональность Redux: позволяет передать на перенаправляемую страницу данные (в данном случае передаются данные на страницу профиля)
function mapStateToProps(state) {
    const {isLoggedIn} = state.auth;
    const {message} = state.message;
    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);