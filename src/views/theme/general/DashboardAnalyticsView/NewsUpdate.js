import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { formatDistance } from 'date-fns';
import { getImgCover } from '~/utils/getImages';
import Scrollbars from '~/components/theme/Scrollbars';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const NEWS = [...Array(5)].map((item, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: getImgCover(128, setIndex),
    postedAt: faker.date.soon()
  };
});

const useStyles = makeStyles(theme => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

function NewsItem({ news }) {
  const classes = useStyles();
  const { image, title, description, postedAt } = news;

  return (
    <div className={classes.listItem}>
      <Box
        component="img"
        alt={title}
        src="/static/images/placeholder.svg"
        data-src={image}
        className="lazyload blur-up"
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1.5,
          objectFit: 'cover'
        }}
      />
      <Box sx={{ minWidth: 240, mx: 2 }}>
        <Typography noWrap variant="subtitle2">
          {title}
        </Typography>
        <Typography noWrap variant="body2" color="textSecondary">
          {description}
        </Typography>
      </Box>
      <Box
        component="span"
        sx={{ typography: 'caption', color: 'text.secondary', flexShrink: 0 }}
      >
        {formatDistance(postedAt, new Date())}
      </Box>
    </div>
  );
}

NewsUpdate.propTypes = {
  className: PropTypes.string
};

function NewsUpdate({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="News Update" />

      <CardContent>
        <Scrollbars>
          <Box sx={{ minWidth: 720 }}>
            {NEWS.map(news => (
              <NewsItem key={news.title} news={news} />
            ))}
          </Box>
        </Scrollbars>
      </CardContent>

      <Divider />
      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

export default NewsUpdate;
