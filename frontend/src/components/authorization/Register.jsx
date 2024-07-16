import React from 'react';
import {Navigate} from 'react-router-dom';

import {connect} from "react-redux";
import auth from "../../actions/auth";
import {Button, createTheme, FormControl, FormLabel, Paper, TextField, ThemeProvider} from "@mui/material";
import message from "../../reducers/message";


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePatronymic = this.onChangePatronymic.bind(this);
        this.onChangeTelephoneNumber = this.onChangeTelephoneNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.validationError = this.validationError.bind(this);
        this.empty = this.empty.bind(this);

        this.state = {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            telephoneNumber: "",
            email: "",
            successful: undefined,
            firstNameError: false,
            firstNameText: "",
            lastNameError: false,
            lastNameText: "",
            patronymicError: false,
            patronymicText: "",
            telephoneNumberError: false,
            telephoneNumberText: "",
            emailError: false,
            emailText: "",
            show: false
        };
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value});
    }

    onChangePassword(e) {
        this.setState({password: e.target.value});
    }

    onChangeFirstName(e) {
        this.setState({firstName: e.target.value});
    }

    onChangeLastName(e) {
        this.setState({lastName: e.target.value});
    }

    onChangePatronymic(e) {
        this.setState({patronymic: e.target.value});
    }

    onChangeTelephoneNumber(e) {
        this.setState({telephoneNumber: e.target.value});
    }

    onChangeEmail(e) {
        this.setState({email: e.target.value});
    }

    empty(){
        this.setState({firstNameError: false});
        this.setState({firstNameText: ""});

        this.setState({lastNameError: false});
        this.setState({lastNameText: ""});

        this.setState({patronymicError: false});
        this.setState({patronymicText: ""});

        this.setState({telephoneNumberError: false});
        this.setState({telephoneNumberText: ""});

        this.setState({emailError: false});
        this.setState({emailText: ""});
    }
    validationError(error) {
        let massId = [];
        error.forEach(item => {
            let temp = item.split(".")
            if (temp[0] === "firstName") {
                this.setState({firstNameError: true});
                this.setState({firstNameText: temp[1]});
            }
            if (temp[0] === "lastName") {
                this.setState({lastNameError: true});
                this.setState({lastNameText: temp[1]});
            }
            if (temp[0] === "patronymic") {
                this.setState({patronymicError: true});
                this.setState({patronymicText: temp[1]});
            }
            if (temp[0] === "telephoneNumber") {
                this.setState({telephoneNumberError: true});
                this.setState({telephoneNumberText: temp[1]});
            }
            if (temp[0] === "email") {
                this.setState({emailError: true});
                this.setState({emailText: temp[1]});
            }
        })
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({successful: false});
        const {dispatch} = this.props;

        dispatch(
            auth.register(this.state.username, this.state.password, this.state.firstName, this.state.lastName,
                this.state.patronymic, this.state.telephoneNumber, this.state.email)
        )
            .then(() => {
                this.setState({successful: true});
                // Авторизация прошла успешно, переходим к странице входа в систему
                // window.location.reload();
            })
            .catch(() => {
                this.empty();
                if(this.props.message.message !== "Пользователь с данным логином существует"){
                    this.validationError(this.props.message.errors)
                }
                else{
                    this.setState({show: true})
                }
                this.setState({successful: false});

            });
    }

    render() {
        const {isRegistered, message} = this.props;
        if (this.state.successful) {
            return <Navigate to="/profile" />;
        }
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Paper elevation={3} className="m-4">
                    <form onSubmit={this.handleRegister} className="mx-5 mb-4 mt-4">
                        <h3>Регистрация нового пользователя</h3>
                        <div className="mt-4">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="firstName">Имя</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="firstName"
                                           value={this.state.firstName}
                                           onChange={this.onChangeFirstName}
                                           error={this.state.firstNameError}
                                           helperText={this.state.firstNameText}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="lastName">Фамилия</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="lastName"
                                           value={this.state.lastName}
                                           onChange={this.onChangeLastName}
                                           error={this.state.lastNameError}
                                           helperText={this.state.lastNameText}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="patronymic">Отчество</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="patronymic"
                                           value={this.state.patronymic}
                                           onChange={this.onChangePatronymic}
                                           error={this.state.patronymicError}
                                           helperText={this.state.patronymicText}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="telephoneNumber">Номер телефона</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="telephoneNumber"
                                           value={this.state.telephoneNumber}
                                           onChange={this.onChangeTelephoneNumber}
                                           error={this.state.telephoneNumberError}
                                           helperText={this.state.telephoneNumberText}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
                            <FormControl className="col-sm-12">
                                <FormLabel htmlFor="email">Электронная почта</FormLabel>
                                <TextField required type="text"
                                           id="standard-basic"
                                           variant="standard"
                                           name="email"
                                           value={this.state.email}
                                           onChange={this.onChangeEmail}
                                           error={this.state.emailError}
                                           helperText={this.state.emailText}/>
                            </FormControl>
                        </div>
                        <div className="form-group mt-2">
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
                        <div className="form-group mt-3">
                            <ThemeProvider theme={createTheme({
                                palette: {
                                    primary: {
                                        main: '#519E8A'
                                    },
                                },
                            })}>
                                <Button type="submit" variant="contained" color="primary">Зарегистрировать</Button>
                            </ThemeProvider>
                        </div>
                        {this.state.show && (
                            <div className="form-group">
                                <div className={"alert alert-danger"}
                                     role="alert">
                                    {message.message}
                                </div>
                            </div>
                        )}
                    </form>
                </Paper>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {isRegistered, user} = state.auth;
    const {message} = state.message;
    return {
        isRegistered,
        message,
        user
    };
}

export default connect(mapStateToProps)(Register);