import React, {Component} from 'react';
import TableRow from './TableRow'

class App extends Component {
    state = {
        coinData: []
    };

    componentDidMount() {
        this.getCoinData()
            .then((res) => this.setState({coinData: res}))
            .catch((err) => {
                console.log(err)
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
                <TableRow/>
                <table>
                    <tbody>{this.state.coinData.map((coin) => {
                        return (
                            <TableRow key={coin.id} coin={coin}></TableRow>
                        );
                    })}</tbody>
                </table>
            </div>
        );
    }
}

export default App;