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

    handleSetAlarmClick(coin) {
        console.log(coin);
    }

    render() {
        return (
            <div>
                <ul>{this.state.coinData.map((coin) => {
                    return <li key={coin.id}>{coin.name} <button onClick={this.handleSetAlarmClick.bind(this, coin)}>Set Alarm</button></li>
                })}</ul>
            </div>
        );
    }
}

export default App;