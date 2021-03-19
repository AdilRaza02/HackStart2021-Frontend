import clsx from 'clsx';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { IndexArrows } from '~/components/theme/Slider';
import React, { useState, useRef, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  largeImageContainer: {
    width: '100%',
    position: 'relative',
    '& .slick-list': {
      borderRadius: theme.shape.borderRadiusMd
    }
  },
  largeImageItem: {
    cursor: 'zoom-in',
    paddingTop: '50%',
    position: 'relative',
    '& img': {
      top: 0,
      left: 0,
      position: 'absolute'
    }
  },
  thumbList: {
    height: 64,
    maxWidth: 64 * 5 + 80,
    marginTop: theme.spacing(3),
    '& .slick-current': {
      '& $thumbItem': {
        border: `solid 3px ${theme.palette.primary.main}`
      },
      '& $thumbItem:before': {
        content: "''",
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: `${alpha(theme.palette.grey[900], 0.32)}`
      }
    }
  },
  thumbItem: {
    width: 64,
    height: 64,
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    margin: theme.spacing(0, 1),
    borderRadius: theme.shape.borderRadiusSm
  }
}));

// ----------------------------------------------------------------------

SlideItem.propTypes = {
  item: PropTypes.object
};

function SlideItem({ item }) {
  const classes = useStyles();
  const { image, title } = item;

  return (
    <div className={classes.largeImageItem}>
      <Box
        component="img"
        alt={title}
        src="/static/images/placeholder.svg"
        data-sizes="auto"
        data-src={image.small}
        data-srcset={`${image.small} 600w, ${image.medium} 960w`}
        className="lazyload blur-up"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

SlideItem.propTypes = {
  item: PropTypes.object
};

function ThumbnailItem({ item }) {
  const classes = useStyles();
  const { image, title } = item;

  return (
    <div className={classes.thumbItem}>
      <Box
        component="img"
        alt={title}
        src="/static/images/placeholder.svg"
        data-src={image.thumb}
        className="lazyload blur-up"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
}

CarouselThumbnail.propTypes = {
  carousels: PropTypes.array.isRequired,
  className: PropTypes.string
};

function CarouselThumbnail({ carousels, className, ...other }) {
  const classes = useStyles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const settings1 = {
    speed: 500,
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    afterChange: current => setCurrentIndex(current)
  };

  const settings2 = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true
  };

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const handlePrevious = () => {
    slider2.current.slickPrev();
  };

  const handleNext = () => {
    slider2.current.slickNext();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <div className={classes.largeImageContainer}>
        <Slider {...settings1} asNavFor={nav2} ref={slider1}>
          {carousels.map(item => (
            <SlideItem key={item} item={item} />
          ))}
        </Slider>

        <IndexArrows
          index={currentIndex}
          total={carousels.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </div>

      <Slider
        {...settings2}
        asNavFor={nav1}
        ref={slider2}
        className={classes.thumbList}
      >
        {carousels.map(item => (
          <ThumbnailItem key={item} item={item} />
        ))}
      </Slider>
    </div>
  );
}

export default CarouselThumbnail;
