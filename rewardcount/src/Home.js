import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';
import RewardsComponent from './RewardsComponent';

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            transData: [] 
        };
    }

    callAPI() {
        fetch("http://localhost:5000/transactionAPI")
            .then(res => res.json())
            .then(res => {
                this.setState({ transData: res.trans_data })
            });
    }

    componentWillMount() {
        this.callAPI();
    }

    render() {
        return <React.Fragment>
            <Grid container>
                <Grid item xs={12}>
                    <Header userName={'Test User'} />
                </Grid>
                <RewardsComponent transData={this.state.transData}/>
            </Grid>
        </React.Fragment>
    }

}