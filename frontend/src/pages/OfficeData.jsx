import React, {useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {connect} from "react-redux";
import http from "../http-common";
import {Alert, Button, FormControl, FormLabel, Grid, Snackbar, TextField} from "@mui/material";
import {Box, Paper} from "@mui/material";
import {createTheme, ThemeProvider, styled} from '@mui/material';
import {makeStyles} from "@material-ui/core/styles";

const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    lineHeight: '47px',
}));
const lightTheme = createTheme({palette: {mode: 'light'}});
const button = createTheme({
    palette: {
        primary: {
            main: '#519E8A'
        },
    },
});
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
        minWidth: 500,
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

function ApplicationsNotion() {

    const {id} = useParams();

    const [office, setOffice] = useState([])
    const navigate = useNavigate();
    const [officeDetail, setOfficeDetail] = useState([])
    const [filePath, setFilePath] = useState("");

    const classes = useStyles();

    const [fio, setFio] = useState("")
    const [fioText, setFioText] = useState("")
    const [fioError, setFioError] = useState(false)

    const [telephone, setTelephone] = useState("")
    const [telephoneText, setTelephoneText] = useState("")
    const [telephoneError, setTelephoneError] = useState(false)
    const [bigError, setBigError] = useState(false)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (office.length === 0 || officeDetail === 0) {
            getOffice();
        }
    }, [office], [setOffice]);

    function getOffice() {
        http
            .get("/officeFullInfo/" + id)
            .then(response => {
                setOffice(response.data.office)
                setOfficeDetail(response.data.office.officeDetail)
                console.log(response.data.office)
                const link = getLink(response.data.file, response.data.office.mimeType);
                setFilePath(link);
            })
            .catch(e => {
                setBigError(true)
                console.log(e);
            });
    }

    function getLink(base64, mime_type) {
        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], {type: mime_type});
        var fileURL = URL.createObjectURL(file);
        return fileURL;
    }

    const handleFio = (event) => {
        setFio(event.target.value);
    };
    const handleTelephone = (event) => {
        setTelephone(event.target.value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function preSending(e) {
        e.preventDefault()
        empty()
        var data = {
            fio: fio,
            telephoneNumber: telephone,
            numberOffice: office.number
        }
        console.log(data)
        http
            .post("/createApplication", data)
            .then(() => {
                setOpen(true)
            })
            .catch(e => {
                errorHandle(e.response.data.errors)
            });
    }

    function errorHandle(error) {
        let massId = [];
        error.forEach(function (item, index, array) {
            let temp = item.split(".")
            if (temp[0] === "fio") {
                setFioError(true)
                setFioText(temp[1])
            }
            if (temp[0] === "telephone") {
                setTelephoneError(true)
                setTelephoneText(temp[1])
            }
        })
    }

    function empty() {
        setTelephoneError(false)
        setTelephoneText("")

        setFioError(false)
        setFioText("")

    }

    return (
        <div>
            {bigError ? (
                <div className="container mt-5">
                    <h3 className="col-9">Офис под номером {id} не найден</h3>
                </div>

            ) : (
                <div className="container mt-3">
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success">
                            Заявка на бронирование офиса №{office.number} успешно отправлена
                        </Alert>
                    </Snackbar>
                    <div className="ms-5">
                        <h2>Офис №{office.number}</h2>
                    </div>
                    <Grid container spacing={10}>
                        <Grid item xs={6}>
                            <img src={filePath} style={{width: '500px'}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <ThemeProvider theme={lightTheme}>
                                <Box>
                                    <Item key={4} elevation={4}>
                                        <div className="ms-4">
                                            <div className="text-center fs-4">
                                                Описание офиса
                                            </div>
                                            <div className="ms-3 fs-6">
                                                <div>
                                                    Статус: {office.isFree ? ("Свободен") : ("Забронирован")}
                                                </div>
                                                <div>
                                                    Площадь офиса: {office.area}
                                                </div>
                                                <div>
                                                    Солнечная сторона: {officeDetail.isSun ? ("Да") : ("Нет")}
                                                </div>
                                                <div>
                                                    Наличие интернета: {officeDetail.isInternet ? ("Да") : ("Нет")}
                                                </div>
                                                <div>
                                                    Количество розеток: {officeDetail.sockets}
                                                </div>
                                                <div>
                                                    Количество окон: {officeDetail.windowsCount}
                                                </div>
                                            </div>
                                        </div>
                                    </Item>
                                </Box>
                            </ThemeProvider>
                            {office.isFree && (
                                <div className="mt-4 border border-3">
                                    <div className="text-center fs-5">Подать заявку на аренду</div>
                                    <form onSubmit={preSending} className="ms-5">
                                        <div className="mt-3 ms-5">
                                            <FormControl>
                                                <FormLabel htmlFor="count">Введите ФИО</FormLabel>
                                                <TextField type="text" id="standard-basic" variant="standard" name="fio"
                                                           placeholder="Иванов Иван Иванович"
                                                           value={fio} onChange={handleFio}
                                                           error={fioError}
                                                           className="form-control"
                                                           sx={{width: '50ch'}}
                                                           helperText={fioText}
                                                           required/>
                                            </FormControl>
                                        </div>
                                        <div className="mt-3 ms-5">
                                            <FormControl>
                                                <FormLabel htmlFor="count">Введите номер телефона</FormLabel>
                                                <TextField type="tel" id="standard-basic" variant="standard"
                                                           name="telephone"
                                                           value={telephone} onChange={handleTelephone}
                                                           placeholder="+79257775495"
                                                           error={telephoneError}
                                                           className="form-control"
                                                           sx={{width: '50ch'}}
                                                           helperText={telephoneText}
                                                           required/>
                                            </FormControl>
                                        </div>
                                        <div className="mt-3 ms-5 mb-4">
                                            <ThemeProvider theme={button}>
                                                <Button type="submit" variant="contained" color="primary">Отправить
                                                    заявку</Button>
                                            </ThemeProvider>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </Grid>
                    </Grid>
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