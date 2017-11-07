import React from 'react';
import { formatPrice } from '../helpers';

class Ship extends React.Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';

    return (
      <li className="menu-ship">
        <img src={details.image} alt={details.name} />
        <h3 className="ship-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(index)}>{buttonText}</button>
      </li>
    )
  }
}

Ship.propTypes = {
  details: React.PropTypes.object.isRequired,
  addToOrder: React.PropTypes.func.isRequired,
  index: React.PropTypes.string.isRequired
}

export default Ship;
