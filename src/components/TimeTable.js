import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import TimeTableRow from './TimeTableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from '@material-ui/core/IconButton';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    addTaskButton: {

    },
});

class TimeTable extends React.Component {

    constructor(props) {
        super(props);
        this.removeRow = this.removeRow.bind(this);
        this.onRowUpdate = this.onRowUpdate.bind(this);
        this.getTaskAverage = this.getTaskAverage.bind(this);
        this.calculateTaskAddons = this.calculateTaskAddons.bind(this);
        this.calculateTaskTotal = this.calculateTaskTotal.bind(this);
        this.calculateTotalForAddOn = this.calculateTotalForAddOn.bind(this);
    }

    removeRow(index) {
        this.props.onRemove(index);
    }

    onRowUpdate(index, name, value) {
        this.props.onUpdate(index, name, value);
    }

    getTaskAverage(task) {
        return Math.round((Number(task.bestCase) + Number(task.probableCase) + Number(task.worstCase)) / 3)
    }

    calculateTaskAddons(task) {

        const average = this.getTaskAverage(task);
        return this.props.addOns.map(addOn => {
            return ((average/100)*(addOn.factor*100-100)).toFixed((2));
        });
    }

    calculateTaskTotal(task) {

        const average = this.getTaskAverage(task);

        return Math.round(this.props.addOns.map((addOn) => {
            return (average/100)*(addOn.factor*100-100);
        }).reduce((a, b) => a + b, 0) + average);
    }

    calculateAllTasksTotal(tasks) {

        return tasks.map(task => {

            const average = this.getTaskAverage(task);

            return Math.round(this.props.addOns.map((addOn) => {
                return (average/100)*(addOn.factor*100-100);
            }).reduce((a, b) => a + b, 0) + average);

        }).reduce((a, b) => a + b, 0);

    }

    calculateTotalForAddOn(addOn) {

        const tasks = this.props.tasks;

        return tasks.map(task => {
            const average = this.getTaskAverage(task);
            return (average/100)*(addOn.factor*100-100);
        }).reduce((a, b) => a + b, 0).toFixed(2);
    }

    render() {

        const {tasks, addOns, classes} = this.props;

        return (
            <div className="TimeTable">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Best case (h)</TableCell>
                                <TableCell>Probable (h)</TableCell>
                                <TableCell>Worst case (h)</TableCell>
                                {addOns.map(addOn => {
                                    return (
                                        <TableCell key={addOn.label}>
                                            <Tooltip title={(addOn.factor*100-100).toFixed(2) + '%'}>
                                                <span>{`${addOn.label} (h)`}</span>
                                            </Tooltip>
                                        </TableCell>
                                    );
                                })}
                                <TableCell align="right">
                                    <Tooltip title="Average of best, worst and probable case.">
                                        <span>Estimate (h)</span>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="Settings"
                                        onClick={this.props.onToggleSettings}
                                    >
                                        <SettingsIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, i) => {
                                return (
                                    <TimeTableRow
                                        key={i}
                                        taskName={task.name}
                                        description={task.description}
                                        bestCase={task.bestCase}
                                        probableCase={task.probableCase}
                                        worstCase={task.worstCase}
                                        onDelete={() => this.removeRow(i)}
                                        onUpdate={(name, value) => {
                                            this.onRowUpdate(i, name, value)
                                        }}
                                        addOns={this.calculateTaskAddons(task)}
                                        total={this.calculateTaskTotal(task)}
                                    />
                                );
                            })}
                            <TableRow>
                                <TableCell colSpan={9} align="right">
                                    <Fab className={classes.addTaskButton} size="small" color="primary" aria-label="Add" onClick={this.props.addTask}>
                                        <AddIcon fontSize="small"/>
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={8} align="right">Total (h)</TableCell>
                                <TableCell colSpan={1}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {addOns.map((addOn, index) => {
                                return(
                                    <TableRow className={'TotalsRow'} key={index}>
                                        <TableCell colSpan={6} align="right">{`${addOn.label} (${(addOn.factor*100-100).toFixed(2)}%)`}</TableCell>
                                        <TableCell colSpan={2} align="right">{this.calculateTotalForAddOn(addOn)}</TableCell>
                                        <TableCell colSpan={1}/>
                                    </TableRow>
                                );
                            })}
                            <TableRow className={'TotalsRow'}>
                                <TableCell colSpan={6} align="right">Estimate</TableCell>
                                <TableCell colSpan={2} align="right">{this.calculateAllTasksTotal(tasks)}</TableCell>
                                <TableCell colSpan={1}/>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

TimeTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tasks: PropTypes.array.isRequired,
    addOns: PropTypes.array.isRequired
};

export default withStyles(styles)(TimeTable);