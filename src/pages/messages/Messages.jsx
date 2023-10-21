import React from 'react'
import Grid from '@mui/material/Grid';
import Friend from '../../components/friend/Friend';
import Group from '../../components/group/Group';
import MessageList from '../../components/message-list/MessageList';

const Messages = () => {
  return (
    <Grid container spacing={2}>
        <Grid item xs={4}>
          <Group/>
          <Friend/>
        </Grid>
        <Grid item xs={8}>
          <MessageList/>
        </Grid>
      </Grid>
  )
}

export default Messages