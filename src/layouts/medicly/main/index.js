import NavBar from './NavBar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden'
    },
    main: {
        marginTop: '64px',
        position: 'relative',
        height: 'calc(100vh - 64px)',
        width: '100%'
    }
}));

// ----------------------------------------------------------------------

DocsLayout.propTypes = {
    children: PropTypes.node
};

function DocsLayout({children}) {
    const classes = useStyles();
    const [openNav, setOpenNav] = useState(false);

    return (
        <div className={classes.root}>
            <TopBar onOpenNav={() => setOpenNav(true)}/>

            <div
            className={classes.main}
            >
            {/*<div sx={{ my: 15, flexGrow: 1, overflow: 'auto', minHeight: '100%' }}>*/}
                {children}
            {/*</div>*/}
            </div>
        </div>
    );
}

export default DocsLayout;
