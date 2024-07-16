import React, {useEffect, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import http from "../http-common";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
    Button,
    Checkbox,
    createTheme,
    FormControl,
    FormControlLabel,
    FormLabel,
    TextField,
    ThemeProvider
} from "@mui/material";
import {InputLabel, MenuItem, Select} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#82667F",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const button = createTheme({
    palette: {
        primary: {
            main: '#519E8A'
        },
        secondary: {
            main: '#C3DAC3'
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
    table: {
        minWidth: 700,
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
        minWidth: 500
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

function Offices(props) {

    const [offices, setOffices] = useState([]);
    const [isFree, setIsFree] = useState(false);
    const [isSun, setIsSun] = useState(false);
    const [isInternet, setIsInternet] = useState(false);
    const [minSockets, setMinSockets] = useState("")
    const [minWindows, setMinWindows] = useState("")
    const [sort, setSort] = React.useState("");
    const [dir, setDir] = React.useState("");
    const [minArea, setMinArea] = React.useState("");
    const [isEmpty, setIsEmpty] = useState(false)

    const classes = useStyles();

    useEffect(() => {
        if (offices.length === 0 && !isEmpty) {
            getOffices();
        }
    }, [offices], [setOffices]);


    function getOffices() {
        http
            .get("/allOffices")
            .then(response => {
                setOffices(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const handleMinSockets = (event) => {
        setMinSockets(event.target.value);
    };

    const handleMinWindows = (event) => {
        setMinWindows(event.target.value);
    };

    const handleIsSun = (event) => {
        setIsSun(event.target.checked);
    }

    const handleIsInternet = (event) => {
        setIsInternet(event.target.checked);
    }

    const handleIsFree = (event) => {
        setIsFree(event.target.checked);
    }

    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };

    const handleChangeDir = (event) => {
        setDir(event.target.value);
    };

    const handleMinArea = (event) => {
        setMinArea(event.target.value);
    };

    function clearButton(){
        setIsFree(false);
        setIsSun(false);
        setIsInternet(false);
        setMinSockets("")
        setMinWindows("")
        setSort("");
        setDir("");
        setMinArea("");
        setIsEmpty(false)
        getOffices()
    }
    function submit(e) {
        e.preventDefault()
        var data = {
            minSockets: minSockets,
            minWindows: minWindows,
            minArea: minArea,
            isSun: isSun,
            isInternet: isInternet,
            isFree: isFree,
            sort: sort,
            dir: dir
        }
        console.log(data)
        http
            .post("/officeSort", data)
            .then((response) => {
                if (response.data.length === 0) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                }
                setOffices(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        <div className="container">
            <form onSubmit={submit}>
                <div className="mt-3 ms-5">
                    <h2>Найти офис</h2>
                </div>
                <div className="mt-3 ms-5">
                    <FormControl>
                        <FormLabel htmlFor="sockets">Минимальное количество розеток</FormLabel>
                        <TextField type="number" id="standard-basic" variant="standard" name="sockets"
                                   value={minSockets} onChange={handleMinSockets}
                                   className="form-control"
                                   sx={{width: '30ch'}}/>
                    </FormControl>
                    <FormControl className="ms-5">
                        <FormLabel htmlFor="minWindows">Минимальное количество окон</FormLabel>
                        <TextField type="number" id="standard-basic" variant="standard" name="minWindows"
                                   value={minWindows} onChange={handleMinWindows}
                                   className="form-control"
                                   sx={{width: '30ch'}}/>
                    </FormControl>
                    <FormControl className="ms-5">
                        <FormLabel htmlFor="minArea">Минимальная площадь</FormLabel>
                        <TextField type="number" id="standard-basic" variant="standard" name="minArea"
                                   value={minArea} onChange={handleMinArea}
                                   className="form-control"
                                   sx={{width: '30ch'}}/>
                    </FormControl>
                </div>
                <div className="mt-3 ms-5">
                    <FormControl className={classes.formControl}>
                        <FormControlLabel
                            control={<Checkbox checked={isSun}
                                               onChange={handleIsSun}/>}
                            label="Солнечная сторона"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormControlLabel
                            control={<Checkbox checked={isInternet}
                                               onChange={handleIsInternet}/>}
                            label="Есть интернет"
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <FormControlLabel
                            control={<Checkbox checked={isFree}
                                               onChange={handleIsFree}/>}
                            label="Свободен"
                        />
                    </FormControl>
                </div>
                <div className="mt-3 ms-5 mb-4">
                    <div>
                        <h5 className="col-4">Отсортировать: </h5>
                        <FormControl className="col-3">
                            <InputLabel id="demo-simple-select-label">Столбец</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sort}
                                onChange={handleChangeSort}
                            >
                                <MenuItem value={"area"}>Площадь</MenuItem>
                                <MenuItem value={"floor"}>Этаж</MenuItem>
                                <MenuItem value={"officeDetail.windowsCount"}>Количество окон</MenuItem>
                                <MenuItem value={"officeDetail.sockets"}>Количество розеток</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="col-3 ms-4">
                            <InputLabel id="demo-simple-select-label">Направление</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={dir}
                                onChange={handleChangeDir}
                            >
                                <MenuItem value={"asc"}>По возрастанию</MenuItem>
                                <MenuItem value={"desc"}>По убыванию</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="mt-3 ms-5 mb-4">
                    <ThemeProvider theme={button}>
                        <Button type="submit" variant="contained" color="primary">Найти</Button>
                    </ThemeProvider>
                    <ThemeProvider theme={button}>
                        <Button className="ms-4" variant="contained" onClick={() => clearButton()} color="secondary">Сбросить запрос</Button>
                    </ThemeProvider>
                </div>
            </form>
            {isEmpty ? (
                <h2>По вашему запросу ничего не было найдено</h2>
            ) : (
            <TableContainer component={Paper} className="mt-5 mb-5">
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Номер офиса</StyledTableCell>
                            <StyledTableCell align="right">Этаж</StyledTableCell>
                            <StyledTableCell align="right">Статус</StyledTableCell>
                            <StyledTableCell align="right">Площадь</StyledTableCell>
                            <StyledTableCell align="right">Солнечная сторона</StyledTableCell>
                            <StyledTableCell align="right">Количество окон</StyledTableCell>
                            <StyledTableCell align="right">Наличие интернета</StyledTableCell>
                            <StyledTableCell align="right">Количество розеток</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {offices.map((office) => (
                            <StyledTableRow key={office.id}>
                                <StyledTableCell component="th" scope="row">
                                    <Link to={"/office/" + office.id}>{office.number}</Link>
                                </StyledTableCell>
                                <StyledTableCell align="right">{office.floor.number}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {office.isFree ? ("Свободен") : ("Забронирован")}
                                </StyledTableCell>
                                <StyledTableCell align="right">{office.area}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {office.officeDetail.isSun ? ("Да") : ("Нет")}
                                </StyledTableCell>
                                <StyledTableCell align="right">{office.officeDetail.windowsCount}</StyledTableCell>
                                <StyledTableCell align="right">
                                    {office.officeDetail.isInternet ? ("Да") : ("Нет")}
                                </StyledTableCell>
                                <StyledTableCell align="right">{office.officeDetail.sockets}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </div>
    )
}

export default Offices;