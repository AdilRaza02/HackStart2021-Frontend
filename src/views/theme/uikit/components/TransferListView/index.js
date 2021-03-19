import React from 'react';
import Page from '~/components/theme/Page';
import Block from '~/components/theme/Block';
import { PATH_APP } from '~/routes/paths';
import SimpleTransferList from './SimpleTransferList';
import EnhancedTransferList from './EnhancedTransferList';
import HeaderDashboard from '~/components/theme/HeaderDashboard';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Container, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function TransferListView() {
  const classes = useStyles();

  return (
    <Page title="Components | Transfer List" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading="Transfer List"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Components', href: PATH_APP.components.root },
            { name: 'Transfer List' }
          ]}
          moreLink="https://next.material-ui.com/components/theme/transfer-list"
        />
        <Card className={classes.margin}>
          <CardHeader title="Simple" />
          <CardContent>
            <Block>
              <SimpleTransferList />
            </Block>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Enhanced" />
          <CardContent>
            <Block>
              <EnhancedTransferList />
            </Block>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default TransferListView;
