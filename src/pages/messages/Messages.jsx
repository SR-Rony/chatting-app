import React from 'react'
import Grid from '@mui/material/Grid';
import Friend from '../../components/friend/Friend';
import Group from '../../components/group/Group';

const Messages = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={4}>
          <Group/>
          <Friend/>
        </Grid>
        <Grid item xs={8}>
          fdshbd
        </Grid>
      </Grid>
  )
}

export default Messages