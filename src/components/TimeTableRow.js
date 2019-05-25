import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

export default class TimeTableRow extends React.Component {

    constructor(props) {
        super(props);
        this.handleClickOnDelete = this.handleClickOnDelete.bind(this);
        this.onChangeData = this.onChangeData.bind(this);
        this.openSettingsMenu = this.openSettingsMenu.bind(this);
        this.closeSettingsMenu = this.closeSettingsMenu.bind(this);

        this.state = {
            settingsAnchorEl: null
        };
    }

    handleClickOnDelete() {
        this.props.onRemoveRow();
    };

    onChangeData = name => event => {
        this.props.onUpdate(name, event.target.value);
    };

    total(average, addOns) {
        return Math.round(addOns.map((addOn) => {
            return (average / 100) * (addOn.factor * 100 - 100);
        }).reduce((a, b) => a + b, 0) + average);
    }

    openSettingsMenu(e) {
        this.setState({settingsAnchorEl: e.currentTarget})
    }

    closeSettingsMenu() {
        this.setState({settingsAnchorEl: null})
    }

    render() {

        const {
            taskName,
            description,
            bestCase,
            probableCase,
            worstCase,
            addOns,
            total
        } = this.props;

        const {settingsAnchorEl} = this.state;
        const settingsMenuOpen = Boolean(settingsAnchorEl);

        return (
            <TableRow>
                <TableCell>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={taskName}
                        onChange={this.onChangeData('name')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        fullWidth
                        value={description}
                        onChange={this.onChangeData('description')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={bestCase}
                        onChange={this.onChangeData('bestCase')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={probableCase}
                        onChange={this.onChangeData('probableCase')}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={worstCase}
                        onChange={this.onChangeData('worstCase')}
                    />
                </TableCell>
                {addOns.map((addOn, index) => {
                    return (
                        <TableCell align="right" key={index}>{addOn}</TableCell>
                    );
                })}
                <TableCell align="right">{total}</TableCell>
                <TableCell>
                    <IconButton
                        aria-label="More"
                        aria-owns={settingsMenuOpen ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.openSettingsMenu}
                    >
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={settingsAnchorEl}
                        open={settingsMenuOpen}
                        onClose={this.closeSettingsMenu}
                    >
                        <MenuItem onClick={this.props.onDelete}>
                            <DeleteIcon fontSize="small"/>
                            Delete task
                        </MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        );
    }
}