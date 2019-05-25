import React from 'react';
import TimeTable from './TimeTable.js';
import TimeEstimatesSettingsDrawer from './TimeEstimatesSettingsDrawer.js';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import TimeLapseIcon from '@material-ui/icons/Timelapse';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 4,
    },
});

class TimeEstimates extends React.Component {

    constructor(props) {
        super(props);
        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.removeTask = this.removeTask.bind(this);
        this.toggleSettingsDrawer = this.toggleSettingsDrawer.bind(this);
        this.onUpdateAddOns = this.onUpdateAddOns.bind(this);
        this.onRemoveAddOn = this.onRemoveAddOn.bind(this);
        this.addAddOn = this.addAddOn.bind(this);

        this.state = {
            tasks: [],
            addOns: [],
            settingsDrawerOpen: false
        }
    }

    componentDidMount() {

        const tasks = [
            {
                name: 'Task 1',
                description: 'Description 1',
                bestCase: 1,
                probableCase: 2,
                worstCase: 3,
            },
            {
                name: 'Task 2',
                description: 'Description 2',
                bestCase: 2,
                probableCase: 3,
                worstCase: 4,
            },
            {
                name: 'Task 3',
                description: 'Description 3',
                bestCase: 3,
                probableCase: 4,
                worstCase: 5
            }
        ];

        const addOns = [
            {
                label: 'Testing',
                factor: 1.15
            },
            {
                label: 'Project Management',
                factor: 1.20
            }
        ];

        this.setState({
            tasks: tasks,
            addOns: addOns
        });
    }

    addTask() {
        this.setState(state => {
            return {tasks: [...state.tasks, {}]}
        })
    }

    updateTask(index, name, value) {

        this.setState(state => {

            const tasks = state.tasks;
            tasks[index][name] = value;

            return {
                tasks: tasks
            };
        });
    }

    removeTask(index) {

        this.setState(state => {

            let tasks = state.tasks;
            tasks.splice(index, 1);

            // Prevent from removing all rows.
            if (tasks.length < 1) {
                tasks = [{}];
            }

            return {tasks: tasks};

        });
    }

    toggleSettingsDrawer() {
        this.setState(state => {
            return ({
                settingsDrawerOpen: !state.settingsDrawerOpen
            })
        })
    }

    onUpdateAddOns(addOnAttr, newValue, index) {

        this.setState(state => {

            const updatedAddons = state.addOns.map((addOn, addOnIndex) => {
                return (addOnIndex === index) ? {...addOn, [addOnAttr]: newValue} : addOn;
            });

            return {
                addOns: updatedAddons
            };
        });
    }

    onRemoveAddOn(index) {

        this.setState(state => {

            let updateAddOns = [...state.addOns];
            updateAddOns.splice(index, 1);

            return ({
                addOns: updateAddOns
            });
        })
    }

    addAddOn() {

        this.setState(state => {

            return ({
                addOns: [...state.addOns, {label: '', factor: 1}]
            });
        })
    }

    render() {

        const {classes} = this.props;

        const {
            tasks,
            addOns,
            settingsDrawerOpen
        } = this.state;

        return (
            <div className={classes.root}>
                <Typography component="h1" variant="h2" gutterBottom>
                    <TimeLapseIcon fontSize="large"/>
                    Time Estimates
                </Typography>
                <TimeEstimatesSettingsDrawer
                    addOns={addOns}
                    open={settingsDrawerOpen}
                    onClose={this.toggleSettingsDrawer}
                    onChangeAddOn={this.onUpdateAddOns}
                    onRemoveAddOn={this.onRemoveAddOn}
                    onAddAddOn={this.addAddOn}
                />
                <TimeTable
                    tasks={tasks}
                    addTask={this.addTask}
                    onUpdate={this.updateTask}
                    onRemove={this.removeTask}
                    addOns={addOns}
                    onToggleSettings={this.toggleSettingsDrawer}
                />
            </div>
        );
    }
}

TimeEstimates.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEstimates);