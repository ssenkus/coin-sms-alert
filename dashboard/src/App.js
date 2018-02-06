import React, {Component} from 'react';

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
                <table>
                    <tbody>{this.state.coinData.map((coin) => {
                        return (
                            <tr key={coin.id}>
                                <td>{coin.name}</td>
                                <td>{coin.price_usd}</td>
                            </tr>
                        );
                    })}</tbody>
                </table>
            </div>
        );
    }
}

export default App;