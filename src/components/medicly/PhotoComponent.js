import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './styles/imagePreview.css';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import photoSlice, { fetchDeficiencies, fetchDeficienciesData } from '~/redux/slices/medicly/photoSlice'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography, Box } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import {PATH_MEDICLY} from "../../routes/paths";
import testResultImage from "~/_mock_api_/result_imgs/CBC-Test-Results-1.jpg";

// photo corners
import cornerTopLeft from '@iconify-icons/radix-icons/corner-top-left';
import cornerTopRight from '@iconify-icons/radix-icons/corner-top-right';
import cornerBottomLeft from '@iconify-icons/radix-icons/corner-bottom-left';
import cornerBottomRight from '@iconify-icons/radix-icons/corner-bottom-right';
import { Icon, InlineIcon } from '@iconify/react';

const useStyles = makeStyles(theme => ({
    main: {
        height: 'calc(100vh - 64px)'
    },
    centeredloading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100vw'
    },
    cornerTopLeft: {
      position: 'absolute',
      top: '32px',
      left: '46px',
      width: '48px',
      height: '48px',
      color: 'white'
    },
    cornerTopRight: {
        position: 'absolute',
        top: '32px',
        right: '46px',
        width: '48px',
        height: '48px',
        color: 'white'
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: '112px',
        left: '46px',
        width: '48px',
        height: '48px',
        color: 'white'
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: '112px',
        right: '46px',
        width: '48px',
        height: '48px',
        color: 'white'
    }
}));

const PhotoComponent = () => {

    const classes = useStyles();

    const [dataUri, setDataUri] = useState('');

    const dispatch = useDispatch();

    const { status } = useSelector(store => store.bloodTestPhoto);

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',')
        const mime = arr[0].match(/:(.*?);/)[1]
        const bstr = atob(arr[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n) {
            u8arr[n - 1] = bstr.charCodeAt(n - 1)
            n -= 1 // to make eslint happy
        }
        return new File([u8arr], filename, { type: mime })
    }

    const handleTakePhoto = (dataUri) => {
        setDataUri(dataUri);
        dispatch(photoSlice.actions.setBloodTestPhoto(dataUri));
        // dispatch(fetchDeficienciesData(dataURLtoFile(dataUri, 'blood-report.jpeg')));
        dispatch(fetchDeficiencies(dataUri));
    };

    function handleTakePhotoAnimationDone (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
    }

    function handleCameraError (error) {
        console.log('handleCameraError', error);
    }

    function handleCameraStart (stream) {
        console.log('handleCameraStart');
    }

    function handleCameraStop () {
        console.log('handleCameraStop');
    }

    return <>
        {status === 'succeeded' && <Redirect to={PATH_MEDICLY.main.deficiencies} />}
        {status === 'loading' ? <div className={classes.centeredloading}><CircularProgress /></div> :
        (dataUri)
            ? <img className={classes.main} src={dataUri} />
            : <div className={classes.main}><Camera
                onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
                onCameraError = { (error) => { handleCameraError(error); } }
                idealFacingMode = {FACING_MODES.USER}
                imageType = {IMAGE_TYPES.JPG}
                imageCompression = {0.97}
                isMaxResolution = {true}
                isImageMirror = {false}
                isSilentMode = {false}
                isDisplayStartCameraError = {true}
                isFullscreen = {true}
                sizeFactor = {2}
                onCameraStart = { (stream) => { handleCameraStart(stream); } }
                onCameraStop = { () => { handleCameraStop(); } }
            />
                <Typography gutterBottom variant="subtitle2" style={{ position: 'absolute', left: '0',
                    right: '0',
                    marginLeft: 'auto',
                    marginRight: 'auto', width: '150px', textAlign: 'center', fontSize: '16px',   top: '32px', color: 'white' }} color="textSecondary">
                    Scan Blood Report
                </Typography>
                <Icon className={classes.cornerTopLeft} icon={cornerTopLeft} />
                <Icon className={classes.cornerTopRight} icon={cornerTopRight} />
                <Icon className={classes.cornerBottomLeft} icon={cornerBottomLeft} />
                <Icon className={classes.cornerBottomRight} icon={cornerBottomRight} />
        </div>
    }</>
};

export default PhotoComponent;