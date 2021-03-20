import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './styles/imagePreview.css';
import {makeStyles} from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import photoSlice, { fetchDeficiencies } from '~/redux/slices/medicly/photoSlice'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router-dom';
import {PATH_MEDICLY} from "../../routes/paths";

const useStyles = makeStyles(theme => ({
    main: {
        minHeight: '100%'
    },
    centeredloading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100%'
    }
}));

const PhotoComponent = () => {

    const classes = useStyles();

    const [dataUri, setDataUri] = useState('');

    const dispatch = useDispatch();

    const { status } = useSelector(store => store.bloodTestPhoto);

    const handleTakePhoto = (dataUri) => {
        setDataUri(dataUri);
        dispatch(photoSlice.actions.setBloodTestPhoto(dataUri));
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
            : <Camera
                onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
                onTakePhotoAnimationDone = { (dataUri) => { handleTakePhotoAnimationDone(dataUri); } }
                onCameraError = { (error) => { handleCameraError(error); } }
                idealFacingMode = {FACING_MODES.USER}
                imageType = {IMAGE_TYPES.BASE64}
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
    }</>
};

export default PhotoComponent;