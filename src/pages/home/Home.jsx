import React, { useEffect } from 'react'
import {useSelector} from 'react-redux';
import Grid from '@mui/material/Grid';
import GroupList from '../../components/group-list/GroupList';
import FriendRequest from '../../components/friend-request/FriendRequest';
import Friend from '../../components/friend/Friend';
import UserList from '../../components/user-list/UserList';
import MyGroups from '../../components/my-groups/MyGroups';
import BlockedUser from '../../components/blocked-user/BlockedUser';


const Home = () => {
  const data = useSelector(state=>state.loginSlice.value);
  useEffect(()=>{
    if(!data){
      navigete('/')
      navigete('/login')
    }
  },[])

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={4}>
          <GroupList/>
      </Grid>
      <Grid item xs={4}>
        <Friend/>
      </Grid>
      <Grid item xs={4}>
        <UserList/>
      </Grid>
  </Grid>
  <Grid container spacing={2}>
      <Grid item xs={4}>
        <FriendRequest/>
      </Grid>
      <Grid item xs={4}>
        <MyGroups/>
      </Grid>
      <Grid item xs={4}>
        <BlockedUser/>
      </Grid>
  </Grid>
</>
  )
}

export default Home