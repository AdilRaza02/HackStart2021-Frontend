import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Container } from '@material-ui/core';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import faker from 'faker';

// redux
import photoSlice, { fetchDeficiencies, fetchParameterExplanation } from '~/redux/slices/medicly/photoSlice'
import {PATH_MEDICLY} from "../../routes/paths";
import {Redirect} from "react-router";
import { useHistory } from 'react-router-dom'

import './styles/tables.css';

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },

    container: {
        width: '100%'
    },

    topSection: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        margin: '1rem'
    },

    typographyContainer: {
        display: 'flex',
        width: '100%',
        marginRight: '2rem',
        justifyContent: 'center',
    },

    table: {
        marginTop: '2rem',
        padding: '0px'
    }
});


function createData(name, unit, normal, yours, deficient, surplus) {
    return {
        name,
        unit,
        normal,
        yours,
        deficient,
        surplus
    };
}

function Row(props) {
    const { row, deficiencies } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const history = useHistory();
    const dispatch = useDispatch();

    const getParameterByTitle = (title) => {
        console.log(deficiencies.find(parameterItem => parameterItem.name === title));
        return deficiencies.find(parameterItem => parameterItem.name === title)
    };

    const handleToDetails = (row) => {
        console.log('row', row);
        // todo: add to slice
        dispatch(photoSlice.actions.setDeficiency(row));
        history.push(PATH_MEDICLY.main.deficiencyDetails);
    };

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell style={{ paddingLeft: '0px' }} scope="row">
                    <b>{row.name}</b>
                </TableCell>
                <TableCell align="right">{row.unit}</TableCell>
                <TableCell align="right">{row.normal}</TableCell>
                { row.deficient ? <TableCell style={{ color: '#FF4842' }} align="right">{row.yours}</TableCell> : <TableCell align="right"> {row.yours}</TableCell> }
                <TableCell style={{ paddingRight: '0px' }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => { getParameterByTitle(row.name) && setOpen(!open) }}
                    >
                        { (row.deficient || row.surplus) && <Fab style={{ backgroundColor: '#FF4842', width: '32px', height: '32px' }} size="small" aria-label="add">
                            { getParameterByTitle(row.name) ?  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon color="white" /> : <KeyboardArrowRightIcon color="white" /> }
                        </Fab> }
                        { !(row.deficient || row.surplus) && <Fab style={{ backgroundColor: '#54D62C', width: '32px', height: '32px' }} size="small" aria-label="add">
                            { getParameterByTitle(row.name) ?  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon color="white" /> : <KeyboardArrowRightIcon color="white" /> }
                        </Fab> }
                    </IconButton>
                </TableCell>
            </TableRow>
            { getParameterByTitle(row.name) && <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Explanation
                            </Typography>
                            <Typography variant="p" gutterBottom component="div">
                                {getParameterByTitle(row.name) && getParameterByTitle(row.name).simple_definition}
                            </Typography>
                            <Button onClick={() => handleToDetails(row)}>Read more</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow> }
        </React.Fragment>
    );
}


const DeficienciesView = () => {

    const classes = useRowStyles();

    const { deficiencies, status, resultData } = useSelector(store => store.bloodTestPhoto);

    const dispatch = useDispatch();

    const history = useHistory();

    const rows = () => {
        console.log('resultData', resultData);
        if (!resultData) {
            const rowsFilterArray = ['Leukocyten', 'Erythrocyten', 'Hemoglobin', 'Hemotrocrit', 'MCV', 'MCH', 'MCHC', 'RDW', 'Platelet Count', 'MPV'];
            console.log(rowsFilterArray);
            const filteredDeficencies = deficiencies.filter(item => rowsFilterArray.includes(item.name))
            const newResultData = filteredDeficencies.map(item => {
                const yours = faker.random.number({ 'min': item.min_range-10, 'max': item.max_range+10 });
                return  createData(item.name, item.unit, item.min_range + '-' + item.max_range, yours, yours < item.min_range , yours > item.max_range);
            });
            dispatch(photoSlice.actions.setResultData(newResultData));
            return newResultData;
        }
        return resultData;
    };

    useEffect(() => {
        dispatch(fetchDeficiencies());
        dispatch(fetchParameterExplanation());
    }, []);

    useEffect(() => {
        console.log(deficiencies);
    }, [deficiencies]);


    const goBack = () => {
        dispatch(photoSlice.actions.resetBloodTestPhoto());
        history.push(PATH_MEDICLY.main.photo);
    };

    return deficiencies && <Container
        className={classes.container}
        maxWidth="md"
        sx={{ my: 4, flexGrow: 1, overflow: 'auto', minHeight: '100%' }}
    >
        <div className={classes.topSection}>
            <div>
               <Fab onClick={goBack} size="small" color="primary" aria-label="add">
                    <ArrowBackIosRoundedIcon color="white" />
                </Fab>
            </div>
            <div className={classes.typographyContainer}>
                <Typography className={classes.typography} variant="h5" component="p">Scan Results</Typography>
            </div>
        </div>
        { /* todo: show list of deficiencies */ }
        <TableContainer className={classes.table} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ paddingLeft: '0px' }} />
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Normal</TableCell>
                        <TableCell align="right">Yours</TableCell>
                        <TableCell />
                        <TableCell style={{ paddingRight: '0px' }} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows().map((row) => (
                        <Row key={row.name} row={row} deficiencies={deficiencies} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
};

export default DeficienciesView;