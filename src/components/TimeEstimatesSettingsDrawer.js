import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from "@material-ui/core/Typography";
import {Card, CardContent, Grid, TextField} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    paper: {
        backgroundColor: '#f4f4f4',
        padding: theme.spacing.unit * 4,
    },
    fabContainer:{
        paddingTop: theme.spacing.unit * 2,
        textAlign: 'right'
    },
    addOn: {
        marginBottom: theme.spacing.unit * 2,
        position: 'relative'
    },
    addOnDeleteButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
});

class TimeEstimatesSettingsDrawer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {addOns, open, classes} = this.props;

        return (
            <Drawer
                classes={{
                    paper: classes.paper
                }}
                anchor="right"
                open={open}
                onClose={this.props.onClose}
            >
                <Typography component="h2" variant="h4" gutterBottom>Add-ons</Typography>
                {addOns.map((addOn, index) => {
                    return (
                        <Grid container spacing={24} key={index}>
                            <Grid item xs={12}>
                                <Card className={classes.addOn}>
                                    <CardContent>
                                        <form noValidate autoComplete="off" key={index}>
                                            <Grid container spacing={24}>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Name"
                                                        type="text"
                                                        margin="normal"
                                                        value={addOn.label}
                                                        onChange={(e) => {
                                                            this.props.onChangeAddOn('label', e.currentTarget.value, index);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <TextField
                                                        label="Factor"
                                                        type="number"
                                                        margin="normal"
                                                        value={addOn.factor}
                                                        onChange={(e) => {
                                                            this.props.onChangeAddOn('factor', e.currentTarget.value, index);
                                                        }}
                                                    />
                                                </Grid>
                                                <IconButton aria-label="Remove" size="small" onClick={this.props.onRemoveAddOn} className={classes.addOnDeleteButton}>
                                                    <DeleteIcon fontSize="small"/>
                                                </IconButton>
                                            </Grid>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    );
                })}
                <Grid container spacing={24} className={classes.fabContainer}>
                    <Grid item xs={12}>
                        <Fab color="primary" aria-label="Add" size="small" onClick={this.props.onAddAddOn}>
                            <AddIcon/>
                        </Fab>
                    </Grid>
                </Grid>
            </Drawer>
        );
    }
}

TimeEstimatesSettingsDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEstimatesSettingsDrawer);