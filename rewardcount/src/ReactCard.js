import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    content: {
        fontSize: 18
    }
});

export default function ReactCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.cardTitle}
                </Typography>

                <Typography variant="body2" component="p" className={classes.content}>
                    {props.value} points
                </Typography>
            </CardContent>
        </Card>
    );
}
