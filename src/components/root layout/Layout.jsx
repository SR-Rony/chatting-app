import React from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Sightbar from '../sightbar/Sightbar';

const Layout = () => {


  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={2}>
            <Sightbar/>
        </Grid>
        <Grid item xs={10}>
            <Outlet/>
        </Grid>
      </Grid>
    </>
  )
}

export default Layout