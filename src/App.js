import 'typeface-roboto';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import TimeEstimates from './components/TimeEstimates';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const styles = theme => ({
    app: {
    }
});

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {classes} = this.props;

        return (
            <div className={classes.app}>
                <TimeEstimates/>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
