import React, {Component} from 'react';
import TableRow from './TableRow'
import {Table, TableBody} from '@material-ui/core';
import _ from 'lodash';

class App extends Component {
    state = {
        coinData: [],
        alarmData: []
    };

    componentDidMount() {

        Promise.all([this.getCoinData(), this.getAlarms()])
            .then((values) => {
                this.setState({coinData: values[0], alarmData: values[1]});
            })
            .catch((err) => {
                console.log(err)
            });
    }

    getAlarms() {

        return fetch('/api/alarm').then((response) => {
            const alarmData = response.json();

            if (response.status !== 200) throw Error(alarmData.message);

            return alarmData;
        });
    }

    getCoinData() {

        return fetch('/api/coins').then((response) => {
            const coinData = response.json();

            if (response.status !== 200) throw Error(coinData.message);

            return coinData;
        });

    };

    render() {
        return (
            <div>
                <h1>Coin Prices</h1>
                <Table>
                    <TableBody>{this.state.coinData.map((coin) => {
                        const alarm = _.find(this.state.alarmData, {coinId: coin.id});
                        return (
                            <TableRow key={coin.id} coin={coin} alarm={alarm}></TableRow>
                        );
                    })}</TableBody>
                </Table>
            </div>
        );
    }
}

export default App;