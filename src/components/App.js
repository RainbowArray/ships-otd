import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Ship from './Ship';

import sampleShips from '../sample-ships';
import base from '../base';

class App extends React.Component {
  constructor() {
    super();

    this.addShip = this.addShip.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateShip = this.updateShip.bind(this);
    this.removeShip = this.removeShip.bind(this);

    // initial State
    this.state = {
      ships: {

      },
      order: {

      }
    }
  }

  componentWillMount() {
    // this runs right before the order is rendered
    this.ref = base.syncState(
      `${this.props.params.storeId}/ships`,
      {
        context: this,
        state: 'ships'
      });

    // Check if there is an order in localStorage
    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      // update our component's order state
      this.setState({ order: JSON.parse(localStorageRef) })
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
    base.removeBinding(this.localStorageRef);
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(
      `order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order)
    );
  }

  addShip(ship) {
    // update our State
    const ships = {...this.state.ships};
    // add in our new ship
    const timestamp = Date.now();
    ships[`ship-${timestamp}`] = ship;
    // set our State
    this.setState({ ships });
  }

  updateShip(key, ship) {
    // update our State
    const ships = {...this.state.ships};
    ships[key] = ship;
    // set our State
    this.setState({ ships });
  }

  removeShip(key) {
    const ships = {...this.state.ships};
    ships[key] = null;
    this.setState({ ships });
  }

  loadSamples() {
    this.setState({
      ships: sampleShips
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // update or add the new number of ships ordered
    order[key] = order[key] + 1 || 1;
    // update our state
    this.setState({ order });
  }

  removeFromOrder(key) {
    // take a copy of our state
    const order = {...this.state.order};
    // Remove the ship from order
    delete order[key];
    // update our state
    this.setState({ order });
  }

  render() {
    return (
      <div className="ships-of-the-day">
        <div className="menu">
          <Header tagline="Imperial Navy Surplus" />
          <ul className="list-of-ships">
            {
              Object
                .keys(this.state.ships)
                .map(key =>
                  <Ship
                    key={key}
                    index={key}
                    details={this.state.ships[key]}
                    addToOrder={this.addToOrder}
                  />)
            }
          </ul>
        </div>
        <Order
          ships={this.state.ships}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
          params={this.props.params}
        />
        <Inventory
          ships={this.state.ships}
          addShip={this.addShip}
          removeShip={this.removeShip}
          updateShip={this.updateShip}
          loadSamples={this.loadSamples}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;
