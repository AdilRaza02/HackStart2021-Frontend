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

// redux
import { fetchDeficiencies } from '~/redux/slices/medicly/photoSlice'

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
        marginTop: '2rem'
    }
});


function createData(name, calories, fat, yours, deficient) {
    return {
        name,
        calories,
        fat,
        yours,
        deficient,
        history: [
            {
                date: '2020-01-05',
                customerId: '11091700',
                amount: 3,
            },
            {
                date: '2020-01-02',
                customerId: 'Anonymous',
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row, deficiencies } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    const getParameterByTitle = (title) => {
        console.log(deficiencies.find(parameterItem => parameterItem.name === title));
        return deficiencies.find(parameterItem => parameterItem.name === title)
    };

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">
                    <b>{row.name}</b>
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                { row.deficient ? <TableCell style={{ color: '#FF4842' }} align="right">{row.yours}</TableCell> : <TableCell align="right"> {row.yours}</TableCell> }
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => { getParameterByTitle(row.name) && setOpen(!open) }}
                    >
                        { row.deficient && <Fab style={{ backgroundColor: '#FF4842' }} size="small" aria-label="add">
                            { getParameterByTitle(row.name) ?  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon color="white" /> : <KeyboardArrowRightIcon color="white" /> }
                        </Fab> }
                        { !row.deficient && <Fab style={{ backgroundColor: '#54D62C' }} size="small" aria-label="add">
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
                            <Button >Read more</Button>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow> }
        </React.Fragment>
    );
}

const rows = [
    createData('Leukocyten', 159, 6.0, 24, true),
    createData('Entrythrocyten', 237, 9.0, 37, false),
    createData('Hämoglobin', 262, 16.0, 24, true),
    createData('Hämatokrit', 305, 3.7, 67, false)
];


const DeficienciesView = () => {

    const classes = useRowStyles();

    const { deficiencies, status } = useSelector(store => store.bloodTestPhoto);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDeficiencies());
    }, []);

    useEffect(() => {
        console.log(deficiencies);
    }, [deficiencies]);

    return deficiencies && <Container
        className={classes.container}
        maxWidth="md"
        sx={{ my: 4, flexGrow: 1, overflow: 'auto', minHeight: '100%' }}
    >
        <div className={classes.topSection}>
            <div>
               <Fab size="small" color="primary" aria-label="add">
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
                        <TableCell />
                        <TableCell>Unit</TableCell>
                        <TableCell align="right">Normal</TableCell>
                        <TableCell align="right">Yours</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} deficiencies={deficiencies} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Container>
};

export default DeficienciesView;