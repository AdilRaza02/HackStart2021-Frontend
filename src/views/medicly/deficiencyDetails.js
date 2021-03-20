import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Fab from '@material-ui/core/Fab';
import {Container} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Typography from '@material-ui/core/Typography';
import { fetchDeficiencies, fetchParameterExplanation } from '~/redux/slices/medicly/photoSlice'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import {PATH_MEDICLY} from "~/routes/paths";

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

    content: {
        marginTop: '2rem'
    },

    information: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    informationBox: {
        maxWidth: '128',
        margin: '2rem',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column'
    },

    informationItems: {
        width: '128px'
    }
});

const DeficiencyDetailsView = () => {

    const classes = useRowStyles();

    const { currentDeficiency, deficiencies, parameterExplanation } = useSelector(store => store.bloodTestPhoto);

    const [parameterExplanationState, setParameterEplanation] = useState({});

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch(fetchDeficiencies());
        dispatch(fetchParameterExplanation());
        const parameterId = getParameterByTitle(currentDeficiency.name).id;
        const parameterExplanation = getParameteExplanationById(parameterId);
        setParameterEplanation(parameterExplanation);
    }, []);

    const getParameterByTitle = (title) => {
        console.log(deficiencies.find(parameterItem => parameterItem.name === title));
        return deficiencies.find(parameterItem => parameterItem.name === title)
    };

    const getParameteExplanationById = (id) => {
        return parameterExplanation.find(parameterItem => parameterItem.test_parameters_id === id)
    };

    const handleToArticles = () => {
        console.log('to articles');
    };

    const goBack = () => {
        history.push(PATH_MEDICLY.main.deficiencies);
    };

    return deficiencies && <Container
        className={classes.container}
        maxWidth="md"
        sx={{ my: 4, flexGrow: 1, overflow: 'auto', minHeight: '100%' }}
    >
        <div className={classes.topSection}>
            <div>
                <Fab onClick={() => goBack() } size="small" color="primary" aria-label="add">
                    <ArrowBackIosRoundedIcon color="white" />
                </Fab>
            </div>
            <div className={classes.typographyContainer}>
                <Typography className={classes.typography} variant="h5" component="p">{ currentDeficiency.name }</Typography>
            </div>
        </div>
        <div>
            {getParameterByTitle(currentDeficiency.name) && <Typography variant="p" component="p">{ getParameterByTitle(currentDeficiency.name).simple_definition }</Typography>}
        </div>
        <div className={classes.informationBox}>
            <div className={classes.information}>
                <p className={classes.informationItems}><b>Unit</b></p>
                <p>val</p>
            </div>
            <div className={classes.information}>
                <p className={classes.informationItems}><b>Normal</b></p>
                <p>val</p>
            </div>
            <div className={classes.information}>
                <p className={classes.informationItems}><b>Your Value</b></p>
                <p>val</p>
            </div>
        </div>
        <Typography style={{ marginTop: '2rem' }} className={classes.typography} variant="h5" component="p">What If I had deficiency ?</Typography>
        <Typography style={{ marginTop: '0.5rem' }} className={classes.typography} variant="p" component="p">{parameterExplanationState.deficiency_desc}</Typography>
        <Typography style={{ marginTop: '2rem' }} className={classes.typography} variant="h5" component="p">What If I had a surplus ?</Typography>
        <Typography style={{ marginTop: '0.5rem' }} className={classes.typography} variant="p" component="p">{parameterExplanationState.surplus_desc}</Typography>
        <Button style={{ marginTop: '2rem', width: '100%' }} variant="contained" onClick={() => handleToArticles()}>Read more</Button>
    </Container>
};

export default DeficiencyDetailsView;