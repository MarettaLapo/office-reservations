import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import http from "../http-common";
import {List, ListItem, ListItemText} from "@mui/material";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

function ApplicationsNotion(props) {
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState(false);
    const [viewedApplications, setViewedApplications] = useState([])
    const [newApplications, setNewApplications] = useState([])
    const [viewedApplicationsFlag, setViewedApplicationsFlag] = useState(false)
    const [newApplicationsFlag, setNewApplicationsFlag] = useState(false)
    const [notNewError, setNotNewError] = useState(false)
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: '#519E8A'
            },
        },
    });

    useEffect(() => {
        if (props.user) {
            setUser(props.user);
            if (props.user.roles[0] === "ROLE_ADMIN") {
                setAdmin(true);
            }
        } else {
            navigate('/login')
        }
    }, [props.user, admin, setAdmin]);

    useEffect(() => {
        if (!viewedApplicationsFlag) {
            getViewedApplications();
        }
    }, [viewedApplications, setViewedApplications]);

    useEffect(() => {
        if (!newApplicationsFlag) {
            getNewApplications();
        }
    }, [newApplications, setNewApplications]);

    function getNewApplications() {
        http
            .get("/newApplications")
            .then(response => {
                setNewApplications(response.data)
                console.log(response.data)
                setNewApplicationsFlag(true)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getViewedApplications() {
        http
            .get("/notNewApplications")
            .then(response => {
                setViewedApplications(response.data)
                setViewedApplicationsFlag(true)
            })
            .catch(e => {
                setNotNewError(true)
                console.log(e);
            });
    }

    function checkApp() {
        let ids = []
        newApplications.forEach(function (item, index, array) {
            ids[index] = item.id
        })
        let data = {
            idApplication: ids
        }
        http
            .post("/noticeNewApplications", data)
            .then(() => {
                window.location.reload();
            })
            .catch(e => {
                console.log(e)
            });
    }

    return (
        <div>
            {notNewError ? (
                <div className="container mt-5">
                    <h2 className="col-9">Недостаточно прав для просмотра данной страницы</h2>
                </div>
            ) : (
                <div className="container">
                    {newApplications.length !== 0 && (
                        <div className="mt-3">
                            <div className="fs-4">Новые заявления:</div>
                            <List>
                                {newApplications.map((application) =>
                                    <div key={application.id} className="border mt-1 col-8">
                                        <ListItem>
                                            <ListItemText primary={"Офис №" + application.officeNumber
                                                + ": " + application.fio}
                                                          secondary={"Номер телефона: " + application.telephoneNumber}/>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                            <div className="mt-3 mb-5">
                                <ThemeProvider theme={theme}>
                                    <Button variant="contained" onClick={() => checkApp()} color="primary">Отметить
                                        прочитанным</Button>
                                </ThemeProvider>
                            </div>
                        </div>
                    )}
                    {viewedApplications.length !== 0 && (
                        <div className="mt-3">
                            <div className="fs-4">Просмотренные заявления:</div>
                            <List>
                                {viewedApplications.map((application) =>
                                    <div key={application.id} className="border mt-1 col-8">
                                        <ListItem>
                                            <ListItemText primary={"Офис №" + application.officeNumber
                                                + ": " + application.fio}
                                                          secondary={"Номер телефона: " + application.telephoneNumber}/>
                                        </ListItem>
                                    </div>
                                )}
                            </List>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(ApplicationsNotion);