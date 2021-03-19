import React from 'react';
import Block from '~/components/theme/Block';
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, Fab } from '@material-ui/core';
import { MFab } from '~/@material-extend';

// ----------------------------------------------------------------------

function FloatingActionButton() {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Base">
          <Fab>
            <AlarmIcon />
          </Fab>
          <Fab color="primary">
            <AlarmIcon />
          </Fab>
          <Fab disabled>
            <AlarmIcon />
          </Fab>
          <Fab variant="extended">
            <AlarmIcon style={{ marginRight: 8 }} />
            Default
          </Fab>
          <Fab variant="extended" color="primary">
            <AlarmIcon style={{ marginRight: 8 }} />
            Primary
          </Fab>
          <Fab disabled variant="extended">
            <AlarmIcon style={{ marginRight: 8 }} />
            Disabled
          </Fab>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors">
          <MFab>
            <AlarmIcon />
          </MFab>
          <MFab color="primary">
            <AlarmIcon />
          </MFab>
          <MFab color="info">
            <AlarmIcon />
          </MFab>
          <MFab color="success">
            <AlarmIcon />
          </MFab>
          <MFab color="warning">
            <AlarmIcon />
          </MFab>
          <MFab color="error">
            <AlarmIcon />
          </MFab>

          <Fab variant="extended">
            <AlarmIcon style={{ marginRight: 8 }} />
            Info
          </Fab>
          <Fab variant="extended" color="primary">
            <AlarmIcon style={{ marginRight: 8 }} />
            Info
          </Fab>
          <MFab variant="extended" color="info">
            <AlarmIcon style={{ marginRight: 8 }} />
            Info
          </MFab>
          <MFab variant="extended" color="success">
            <AlarmIcon style={{ marginRight: 8 }} />
            Success
          </MFab>
          <MFab variant="extended" color="warning">
            <AlarmIcon style={{ marginRight: 8 }} />
            Warning
          </MFab>
          <MFab variant="extended" color="error">
            <AlarmIcon style={{ marginRight: 8 }} />
            Error
          </MFab>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size">
          <MFab color="info" size="small">
            <AlarmIcon />
          </MFab>
          <MFab color="info" size="medium">
            <AlarmIcon />
          </MFab>
          <MFab color="info">
            <AlarmIcon />
          </MFab>
          <MFab variant="extended" size="small" color="info">
            <AlarmIcon style={{ marginRight: 8 }} />
            Small
          </MFab>
          <MFab variant="extended" size="medium" color="info">
            <AlarmIcon style={{ marginRight: 8 }} />
            Medium
          </MFab>
          <MFab variant="extended" color="info">
            <AlarmIcon style={{ marginRight: 8 }} />
            Large
          </MFab>
        </Block>
      </Grid>
    </Grid>
  );
}

export default FloatingActionButton;
