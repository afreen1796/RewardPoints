import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function HeaderComponent(props) {

    return <React.Fragment>
        <Grid item xs={12} >
            <Typography component="div" style={{ backgroundColor: '#2196f3', height: '6vh' }} />
        </Grid>
    </React.Fragment>
}