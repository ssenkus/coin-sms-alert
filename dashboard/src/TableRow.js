import React, {Component} from 'react';
import {TableCell, Input, MenuItem, TableRow, Select, Button} from '@material-ui/core';

class MyTableRow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coin: this.props.coin,
            priceUsdThreshold: (this.props.alarm && this.props.alarm.priceUsdThreshold) || '',
            thresholdDirection: (this.props.alarm && this.props.alarm.thresholdDirection) || 'over',
            alarm: this.props.alarm
        };

        this.handleSetAlarmClick = this.handleSetAlarmClick.bind(this);
        this.handleDeleteAlarmClick = this.handleDeleteAlarmClick.bind(this);
        this.handleThresholdDirectionChange = this.handleThresholdDirectionChange.bind(this);
        this.handlePriceUsdThresholdChange = this.handlePriceUsdThresholdChange.bind(this);
    }

    handleThresholdDirectionChange(e) {
        console.log(typeof e);
        this.setState({thresholdDirection: e.target.value});
    }

    handlePriceUsdThresholdChange(e) {
        this.setState({priceUsdThreshold: e.target.value});
    }

    handleSetAlarmClick() {
        let postData = {
            coinId: this.state.coin.id,
            priceUsdThreshold: parseFloat(this.state.priceUsdThreshold),
            thresholdDirection: this.state.thresholdDirection
        };

        if (isNaN(postData.priceUsdThreshold)) {
            alert('Please enter a price threshold');
            return;
        }

        if (this.state.alarm) {
            fetch(`/api/alarm/${this.state.alarm._id}`, {
                method: 'PUT',
                body: JSON.stringify(postData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.json())
                .then(response => {
                    console.log('UPDTE RESPONSE', response);
                    if (!response) return;
                    alert(`Alarm created for ${this.state.coin.name}\nThreshold: ${this.state.thresholdDirection} $${this.state.priceUsdThreshold}\n`);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('There was an error, check to console for more information!');
                });


        } else {
            fetch('/api/alarm', {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            })
                .then(res => res.json())
                .then(response => {
                    this.setState({alarm: response});
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('There was an error, check to console for more information!');
                });

        }
    }

    handleDeleteAlarmClick() {

        fetch(`/api/alarm/${this.state.alarm._id}`, {
            method: 'delete'
        }).then(() => {
            this.setState({
                alarm: null,
                priceUsdThreshold: '',
                thresholdDirection: 'over'
            });
        }).catch((e) => {
            console.log(`handleDeleteAlarmClick ERROR: ${e}`);

        });
    }

    render() {
        if (!this.state || !this.state.coin) return '';

        return (
            <TableRow>
                <TableCell>{this.state.coin.name}</TableCell>
                <TableCell>{this.state.coin.price_usd}</TableCell>
                <TableCell>
                    <Select className={'thresholdSelect'} onChange={this.handleThresholdDirectionChange}
                            value={this.state.thresholdDirection}>
                        <MenuItem value="over">over</MenuItem>
                        <MenuItem value="under">under</MenuItem>
                    </Select>
                    <Input onChange={this.handlePriceUsdThresholdChange}
                           placeholder="Set price threshold"
                           type="number"
                           step="0.01"
                           min="0"
                           value={this.state.priceUsdThreshold}/>
                </TableCell>
                <TableCell>
                    <Button variant="raised" color="primary"
                            onClick={this.handleSetAlarmClick}>{this.state.alarm ? 'Update' : 'Set'} Alarm</Button>
                    {this.state.alarm ?
                        <Button variant="raised" color="secondary" onClick={this.handleDeleteAlarmClick}>Delete
                            Alarm</Button> : ''}
                </TableCell>
            </TableRow>
        );
    }

}

export default MyTableRow;