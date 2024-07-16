import React from 'react';
import {Link} from 'react-router-dom';

import auth from "../actions/auth";
import {connect} from "react-redux";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            currentUser: undefined,
            isAdmin: false,
            outPutUsername: ""
        };
    }

    componentDidMount() {
        const user = this.props.user;
        if (user) {
            this.setState({currentUser: user});
            if(user.roles[0] === "ROLE_ADMIN"){
                this.setState({isAdmin: true})
                this.setState({outPutUsername: "Администратор"})
            }
            else{
                this.setState({outPutUsername: user.lastName + " " + Array.from(user.firstName)[0] + ". "
                        + Array.from(user.patronymic)[0] + "."})
            }
        }
    }

    logOut() {
        this.props.dispatch(auth.logout());
    }

    render() {
        const {user: currentUser} = this.props;
        return (
            <nav className="navbar navbar-project navbar-expand-lg navbar-light" style={{background: '#A799B7'}}>
                <div className="ms-3">
                    <Link className="nav-link py-1" to="/">Главная</Link>
                </div>
                <div className="ms-3 border-start">
                    <Link className="nav-link py-1 ms-3" to="/offices">Офисы</Link>
                </div>

                {currentUser ? (
                    <div className="ml-auto">
                        {this.state.isAdmin && (
                            <Link className="navbar-brand btn py-1" to="/notions">Заявления</Link>
                        )}
                        <Link className="navbar-brand btn py-1" to="/profile">{this.state.outPutUsername}</Link>
                        <button className="navbar-brand btn" onClick={this.logOut}>Выйти</button>
                    </div>
                ) : (
                    <div className="ml-auto">
                        <Link to="/login" className="nav-link navbar-brand">Вход в
                            систему</Link>
                    </div>
                )}
            </nav>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Header);