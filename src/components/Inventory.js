import React from 'react';
import AddShipForm from './AddShipForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    }
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const ship = this.props.ships[key];
    // take a copy of ship and update it with the new data
    const updatedShip = {
      ...ship,
      [e.target.name]: e.target.value
    };
    this.props.updateShip(key, updatedShip);
  }

  authenticate(provider) {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, AuthData) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(AuthData);

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once for the store data.
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as our own if there is no owner already.
      if (!data.owner) {
        storeRef.set({
          owner: AuthData.user.uid
        });
      }

      this.setState({
        uid: AuthData.user.uid,
        owner: data.owner || AuthData.user.uid
      })

    });

  }

  renderLogin() {
    return (
      <nav className="login">
        <p>Sign in to manage your store's inventory.</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log In with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log In with Twitter</button>
      </nav>
    )
  }

  renderInventory(key) {
    const ship = this.props.ships[key];

    return (
      <div className="ship-edit" key={key}>
        <input type="text" name="name" value={ship.name} onChange={(e) => this.handleChange(e, key)} placeholder="Ship Name" />
        <input type="text" name="price" value={ship.price} onChange={(e) => this.handleChange(e, key)} placeholder="Ship Price" />
        <select name="status" value={ship.status} onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" name="desc" value={ship.desc} onChange={(e) => this.handleChange(e, key)} placeholder="Ship Desc"></textarea>
        <input type="text" name="image" value={ship.image} onChange={(e) => this.handleChange(e, key)} placeholder="Ship Image" />
        <button onClick={() => this.props.removeShip(key)}>Remove Ship</button>
      </div>
    );
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>;
    // Check if they are not logged in at all
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry, you are not the owner of the store.</p>
          {logout}
        </div>
      )
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.ships).map(this.renderInventory)}
        <AddShipForm addShip={this.props.addShip} />
        <button onClick={this.props.loadSamples}>Load Sample Ships</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  ships: React.PropTypes.object.isRequired,
  addShip: React.PropTypes.func.isRequired,
  removeShip: React.PropTypes.func.isRequired,
  updateShip: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory;
