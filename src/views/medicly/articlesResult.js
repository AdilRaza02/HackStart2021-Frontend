import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Fab from '@material-ui/core/Fab';
import {Avatar, Box, Card, CardContent, CardMedia, Container, Link, Button} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouterLink, useHistory} from 'react-router-dom'
import {PATH_MEDICLY} from "~/routes/paths";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";
import {Icon} from "@iconify/react";
import messageCircleFill from "@iconify-icons/eva/message-circle-fill";
import eyeFill from "@iconify-icons/eva/eye-fill";
import shareFill from "@iconify-icons/eva/share-fill";
import { MIcon } from '~/@material-extend';


const useRowStyles = makeStyles(theme => ({
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
    },

    articleCardList: {
        marginTop: '2rem'
    },

    avatar: {
        zIndex: 9,
        width: 32,
        height: 32,
        bottom: -16,
        position: 'absolute',
        left: theme.spacing(3)
    },
    avatarShape: {
        zIndex: 9,
            bottom: -15,
            position: 'absolute'
    },
    latestPost: {
        '& $cardMediaWrap': {
            paddingTop: 'calc(100% * 4 / 3)',
                '&:after': {
                top: 0,
                    content: "''",
                    width: '100%',
                    height: '100%',
                    position: 'absolute'
            }
        },
        '& $cardContent': {
            bottom: 0,
                width: '100%',
                position: 'absolute'
        },
        '& $cardTitle': { color: theme.palette.common.white },
        '& $avatar': {
            zIndex: 9,
                top: theme.spacing(3),
                left: theme.spacing(3),
                width: theme.spacing(5),
                height: theme.spacing(5)
        },
        '& $avatarShape': { display: 'none' }
    },
    latestPostLarge: {
        '& $cardMediaWrap': {
            [theme.breakpoints.up('sm')]: {
                paddingTop: 'calc(100% * 3 / 4.66)'
            }
        },
        '& $cardTitle': {
        ...theme.typography.h5,
                height: 60
        }
    }
}));

const ArticlesResult = () => {

    const { currentDeficiency, deficiencies, parameterExplanation } = useSelector(store => store.bloodTestPhoto);

    const classes = useRowStyles();

    const history = useHistory();

    const goBack = () => {
        history.push(PATH_MEDICLY.main.deficiencyDetails);
    };

    const handleShowArticle = (url) => {
        window.location.href = url;
    };

    return <Container
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
                <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
            </div>
        </div>
        <div>
            <div className={classes.articleCardList}>
                <Card>
                    <div className={classes.cardMediaWrap}>
                        <MIcon
                            size={80}
                            color="paper"
                            src="/static/icons/shape-avatar.svg"
                            className={classes.avatarShape}
                        />
                        <CardMedia
                            component="img"
                            title={'background'}
                            data-sizes="auto"
                            data-src={'https://www.expatica.com/app/uploads/sites/6/2014/05/german-healthcare-system-1920x1080.jpg'}
                            src="/static/images/placeholder.svg"
                            className={clsx(classes.cardMedia, 'lazyload blur-up')}
                        />
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
                        <Typography className={classes.typography} variant="caption" component="p">https://nytimes.com/section/health</Typography>
                        <Button style={{ margin: '2rem 0 2rem', float: 'right' }} variant="contained" onClick={() => handleShowArticle('https://nytimes.com/section/health')}>Show</Button>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.articleCardList}>
                <Card>
                    <div className={classes.cardMediaWrap}>
                        <MIcon
                            size={80}
                            color="paper"
                            src="/static/icons/shape-avatar.svg"
                            className={classes.avatarShape}
                        />
                        <CardMedia
                            component="img"
                            title={'background'}
                            data-sizes="auto"
                            data-src={'https://www.expatica.com/app/uploads/sites/6/2014/05/german-healthcare-system-1920x1080.jpg'}
                            src="/static/images/placeholder.svg"
                            className={clsx(classes.cardMedia, 'lazyload blur-up')}
                        />
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
                        <Typography className={classes.typography} variant="caption" component="p">https://nytimes.com/section/health</Typography>
                        <Button style={{ margin: '2rem 0 2rem', float: 'right' }} variant="contained" onClick={() => handleShowArticle('https://nytimes.com/section/health')}>Show</Button>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.articleCardList}>
                <Card>
                    <div className={classes.cardMediaWrap}>
                        <MIcon
                            size={80}
                            color="paper"
                            src="/static/icons/shape-avatar.svg"
                            className={classes.avatarShape}
                        />
                        <CardMedia
                            component="img"
                            title={'background'}
                            data-sizes="auto"
                            data-src={'https://www.expatica.com/app/uploads/sites/6/2014/05/german-healthcare-system-1920x1080.jpg'}
                            src="/static/images/placeholder.svg"
                            className={clsx(classes.cardMedia, 'lazyload blur-up')}
                        />
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
                        <Typography className={classes.typography} variant="caption" component="p">https://nytimes.com/section/health</Typography>
                        <Button style={{ margin: '2rem 0 2rem', float: 'right' }} variant="contained" onClick={() => handleShowArticle('https://nytimes.com/section/health')}>Show</Button>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.articleCardList}>
                <Card>
                    <div className={classes.cardMediaWrap}>
                        <MIcon
                            size={80}
                            color="paper"
                            src="/static/icons/shape-avatar.svg"
                            className={classes.avatarShape}
                        />
                        <CardMedia
                            component="img"
                            title={'background'}
                            data-sizes="auto"
                            data-src={'https://www.expatica.com/app/uploads/sites/6/2014/05/german-healthcare-system-1920x1080.jpg'}
                            src="/static/images/placeholder.svg"
                            className={clsx(classes.cardMedia, 'lazyload blur-up')}
                        />
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
                        <Typography className={classes.typography} variant="caption" component="p">https://nytimes.com/section/health</Typography>
                        <Button style={{ margin: '2rem 0 2rem', float: 'right' }} variant="contained" onClick={() => handleShowArticle('https://nytimes.com/section/health')}>Show</Button>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.articleCardList}>
                <Card>
                    <div className={classes.cardMediaWrap}>
                        <MIcon
                            size={80}
                            color="paper"
                            src="/static/icons/shape-avatar.svg"
                            className={classes.avatarShape}
                        />
                        <CardMedia
                            component="img"
                            title={'background'}
                            data-sizes="auto"
                            data-src={'https://www.expatica.com/app/uploads/sites/6/2014/05/german-healthcare-system-1920x1080.jpg'}
                            src="/static/images/placeholder.svg"
                            className={clsx(classes.cardMedia, 'lazyload blur-up')}
                        />
                    </div>

                    <CardContent className={classes.cardContent}>
                        <Typography className={classes.typography} variant="h5" component="p">Articles on { currentDeficiency.name }</Typography>
                        <Typography className={classes.typography} variant="caption" component="p">https://nytimes.com/section/health</Typography>
                        <Button style={{ margin: '2rem 0 2rem', float: 'right' }} variant="contained" onClick={() => handleShowArticle('https://nytimes.com/section/health')}>Show</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </Container>
};

export default ArticlesResult;