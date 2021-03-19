import UserList from './UserList';
import Page from '~/components/theme/Page';
import React, { useEffect } from 'react';
import { PATH_APP } from '~/routes/paths';
import { getUsers } from '~/redux/slices/theme/user';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDashboard from '~/components/theme/HeaderDashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

function UserCardsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Page title="Management | User Cards" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="User Cards"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'User', href: PATH_APP.management.user.root },
            { name: 'Cards' }
          ]}
        />
        <UserList users={users} />
      </Container>
    </Page>
  );
}

export default UserCardsView;
