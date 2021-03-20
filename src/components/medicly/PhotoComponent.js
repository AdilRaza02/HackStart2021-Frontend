import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import './styles/imagePreview.css';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    main: {
        minHeight: '100%'
    }
}));

const PhotoComponent = () => {

    const classes = useStyles();

    const [dataUri, setDataUri] = useState('');

    const handleTakePhoto = (dataUri) => {
        setDataUri(dataUri);
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

    return <>{
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