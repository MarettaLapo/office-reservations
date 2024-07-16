import React, {useEffect, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {connect} from "react-redux";
import {Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import http from "../../http-common";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemText, Typography} from "@mui/material";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Modal from "react-bootstrap/Modal";
import {makeStyles, createTheme, ThemeProvider} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "50px",
        '&.Mui-expanded': {
            minHeight: 15,
            maxHeight: 15,
            backgroundColor: '#DDDBF1',
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    formLabel: {
        marginTop: theme.spacing(2),
        fontSize: "27px"
    },
    button: {
        margin: theme.spacing(1),
    }
}));

function Profile(props) {
    const [user, setUser] = useState([]);
    const [admin, setAdmin] = useState(false);

    const [officesFirst, setOfficesFirst] = useState([]);
    const [officesLast, setOfficesLast] = useState([]);

    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);
    const [showModal, setShowModal] = useState(false)

    const [inputDate, setInputDate] = useState([])
    const [selectedOffice, setSelectedOffice] = useState("")
    const [selectedUser, setSelectedUser] = useState("")
    const [users, setUsers] = useState([])

    const [dateError, setDateError] = useState(false)
    const [dateText, setDateText] = useState("")

    const [userOffices, setUserOffices] = useState([])
    const [notNow, setNotNow] = useState(false)
    const navigate = useNavigate();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                getFullUsers();
            }
        } else {
            navigate('/login')
        }
    }, [props.user, admin, setAdmin]);

    useEffect(() => {
        if (officesFirst.length === 0 && officesLast.length === 0) {
            getOffices();
        }
    }, [officesFirst, setOfficesFirst, officesLast ,setOfficesLast]);

    useEffect(() => {
        if (userOffices.length === 0 && !admin && !notNow) {
            getOfficesForUser()
        }
    }, [userOffices, selectedUser])

    function getOffices() {
        http
            .get("/adminInfo")
            .then(response => {
                setOfficesFirst(response.data[0])
                setOfficesLast(response.data[1])
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getFullUsers() {
        http
            .get("/users")
            .then(response => {
                setUsers(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function getOfficesForUser() {
        http
            .get("/userOffices/" + props.user.id)
            .then(response => {
                setUserOffices(response.data)
                if (response.data.length === 0) {
                    setNotNow(true)
                }
            })
            .catch(e => {
                console.log(e);
            });
    }


    function hehe(end) {
        let today = new Date();
        let massDate = end.split(".")
        let remain = new Date(massDate[2], massDate[1] - 1, massDate[0])
        return Math.trunc((remain.valueOf() - today.valueOf()) / (24 * 60 * 60 * 1000))
    }

    function preSending(e) {
        e.preventDefault();
        let date = new Date();
        let hehe = new Date(inputDate);
        if (date > hehe) {
            setDateText("Нельзя указать дату задним числом")
            setDateError(true)
        } else {
            setDateText("")
            setDateError(false)
            sending();
        }
    }

    function sending() {
        var data = {
            userId: selectedUser,
            officeId: selectedOffice,
            endDate: inputDate
        }
        http
            .post("/addUserToOffice", data)
            .then(r => {
                console.log("all right")
                window.location.reload();
            })
            .catch(e => {
                console.log(e)
            });
    }

    function handleClose() {
        setShowModal(false)
    }

    function handleOpen(id) {
        setShowModal(true)
        setSelectedOffice(id)
    }

    const handleSelectedDate = (event) => {
        setInputDate(event.target.value);
    };

    const handleSelectedUsers = (event) => {
        setSelectedUser(event.target.value);
    };

    return (
        <div>
            {admin ? (
                    <div className="container">
                        <div className="mt-3">
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" href="/addUser" color="primary">Добавить пользователя</Button>
                            </ThemeProvider>
                        </div>
                        <Grid container spacing={10}>
                            <Grid item className="mt-3" xs={6}>
                                {officesFirst.map((office) => {
                                    return (
                                        <Accordion key={office.id} className="mt-3">
                                            <AccordionSummary className={classes.root}
                                                              expandIcon={<ExpandMoreIcon/>}
                                                              aria-controls="panel1a-content"
                                                              id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>Офис №{office.number}</Typography>
                                                <Typography className={classes.secondaryHeading}>Статус: {office.isFree ?
                                                    ("Cвободно") : ("Забронировано")}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {office.isFree ? (
                                                    <div>
                                                        <ThemeProvider theme={theme}>
                                                            <Button variant="outlined" onClick={() => handleOpen(office.id)}
                                                                    color="primary">Добавить арендатора</Button>
                                                        </ThemeProvider>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <Typography>{office.user.lastName} {office.user.firstName} {office.user.patronymic}</Typography>
                                                        <div className="mt-2">
                                                            <Typography>Дата начала аренды: {office.startDate}</Typography>
                                                            <Typography>Дата окончания аренды: {office.endDate}</Typography>
                                                        </div>
                                                    </div>
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Grid>
                            <Grid item className="mt-3" xs={6}>
                                {officesLast.map((office) => {
                                    return (
                                        <Accordion key={office.id} className="mt-3">
                                            <AccordionSummary className={classes.root}
                                                              expandIcon={<ExpandMoreIcon/>}
                                                              aria-controls="panel1a-content"
                                                              id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>Офис №{office.number}</Typography>
                                                <Typography className={classes.secondaryHeading}>Статус: {office.isFree ?
                                                    ("Cвободно") : ("Забронировано")}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {office.isFree ? (
                                                    <div>
                                                        <ThemeProvider theme={theme}>
                                                            <Button variant="outlined" onClick={() => handleOpen(office.id)}
                                                                    color="primary">Добавить арендатора</Button>
                                                        </ThemeProvider>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <Typography>{office.user.lastName} {office.user.firstName} {office.user.patronymic}</Typography>
                                                        <div className="mt-2">
                                                            <Typography>Дата начала аренды: {office.startDate}</Typography>
                                                            <Typography>Дата окончания аренды: {office.endDate}</Typography>
                                                        </div>
                                                    </div>
                                                )}
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Выберите пользователя</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={preSending}>
                                    <div className="container">
                                        <div>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Арендаторы</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={selectedUser}
                                                    name="user"
                                                    onChange={handleSelectedUsers}
                                                    className={classes.selectEmpty}
                                                    required
                                                >
                                                    {users.map((item) => (
                                                        <MenuItem key={item.id}
                                                                  value={item.id}>{item.lastName + " " + item.firstName +
                                                            " " + item.patronymic}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div>
                                            <FormControl className={classes.formControl}>
                                                <FormLabel htmlFor="count">Дата окончания аренды</FormLabel>
                                                <TextField type="date" id="standard-basic" name="date"
                                                           value={inputDate} onChange={handleSelectedDate}
                                                           className="form-control"
                                                           error={dateError}
                                                           helperText={dateText}
                                                           required/>
                                            </FormControl>
                                        </div>
                                        <div className={classes.button}>
                                            <ThemeProvider theme={theme}>
                                                <Button variant="contained" type="submit" color="primary">Назначить
                                                    арендатора</Button>
                                            </ThemeProvider>
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    </div>
                )
                :
                (
                    <div>
                        {notNow ? (
                            <div className="container mt-5">
                                <h2 className="col-9">Просим прощения, информация о вашем бронировании ещё не была обновлена. Проверьте
                                    личный кабинет позже.</h2>
                            </div>
                        ) : (
                            <div className="container mt-4">
                                <div className="fs-4">Забронированные офисы:</div>
                                <List>
                                    {userOffices.map((office) =>
                                        <div key={office.id} className="border mt-3 col-9">
                                            <ListItem>
                                                <ListItemText primary={"Офис №" + office.number}
                                                              secondary={"Дата окончания аренды: " + office.endDate + "(Осталось: "
                                                                  + hehe(office.endDate) + " дней)"}/>
                                            </ListItem>
                                        </div>
                                    )}
                                </List>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}

function mapStateToProps(state) {
    const {user} = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(Profile);