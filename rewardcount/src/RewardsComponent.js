import React from 'react';
import ReactCard from "./ReactCard";
import { fromJS } from "immutable";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';


const styles = () => ({
    gridStyle: {
        margin: '10px'
    }
});

class RewardsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rewardsList: {
                rewardsInLastMonth: 0,
                rewardsInMonthBefore: 0,
                rewardsInMonthPrior: 0
            }
        };
    }

    calculateRewardPoints = (trans_amount) => {
        let rewardPoints = 0;
        if (trans_amount > 100) {
            rewardPoints += parseInt(trans_amount - 100) * 2;
        }
        if(trans_amount > 50){
            rewardPoints += 50;
        }
        return rewardPoints;
    }

    calculateRewardsEachMonth = (transData) => {
        const date = new Date();
        const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000;
        const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 0).getTime() / 1000;
        let rewardsInPrevMonth = 0;

        const firstDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime() / 1000;
        const lastDayOfMonthBefore = new Date(date.getFullYear(), date.getMonth() - 2, 0).getTime() / 1000;
        let rewardsInMonthBefore = 0;


        const firstDayOfMonthBefore = new Date(date.getFullYear(), date.getMonth() - 2, 1).getTime() / 1000;
        const lastDayOfMonthPrior = new Date(date.getFullYear(), date.getMonth() - 3, 0).getTime() / 1000;
        let rewardsInMonthPrior = 0;

        transData.forEach(item => {
            const trans_date = parseInt(item.trans_date);
            if (firstDayOfThisMonth > trans_date && trans_date > lastDayOfPrevMonth) {
                rewardsInPrevMonth += this.calculateRewardPoints(item.trans_amount);
            } else if (firstDayOfPrevMonth > trans_date && trans_date > lastDayOfMonthBefore) {
                rewardsInMonthBefore += this.calculateRewardPoints(item.trans_amount);
            } else if (firstDayOfMonthBefore > trans_date && trans_date > lastDayOfMonthPrior) {
                rewardsInMonthPrior += this.calculateRewardPoints(item.trans_amount);
            }
        })
        return { rewardsInPrevMonth, rewardsInMonthBefore, rewardsInMonthPrior };
    }

    componentDidUpdate(prevProps) {
        const { transData } = this.props;
        let rewardsList = {};
        if (transData.length && JSON.stringify(transData) !== JSON.stringify(prevProps.transData)) {
            const { rewardsInPrevMonth, rewardsInMonthBefore, rewardsInMonthPrior } = this.calculateRewardsEachMonth(transData);
            rewardsList = fromJS(rewardsList)
                .setIn(['rewardsInLastMonth'], rewardsInPrevMonth)
                .setIn(['rewardsInMonthBefore'], rewardsInMonthBefore)
                .setIn(['rewardsInMonthPrior'], rewardsInMonthPrior)
                .toJS();
            this.setState({ rewardsList });
        }
    }

    getMonthlyRewards = (rewardsList, classes) => {
        let monthlyRewards = [];
        for (const [key, value] of Object.entries(rewardsList)) {
            const listItem = <Grid item lg={3} md={6} xs={8} className={classes.gridStyle}>
                <ReactCard cardTitle={_.startCase(key)} value={value} />
            </Grid>
            monthlyRewards.push(listItem);
        }
        return monthlyRewards;
    }

    render() {

        const { rewardsList } = this.state;
        const totalRewards = Object.values(rewardsList).reduce((value, accumulator) => value + accumulator, 0);
        const { classes } = this.props;

        return <React.Fragment>
            <Grid container justify="center" spacing={2} >
                <Grid item xs={8} lg={3} md={6} className={classes.gridStyle}>
                    <ReactCard cardTitle={'Total Rewards'} value={totalRewards} />
                </Grid>
            </Grid>
            <Grid container justify="center" spacing={2}>
                {this.getMonthlyRewards(rewardsList, classes)}
            </Grid>
        </React.Fragment>
    }
}

export default withStyles(styles)(RewardsComponent);