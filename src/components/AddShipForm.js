import React from 'react';

class AddShipForm extends React.Component {
  createShip(event) {
    event.preventDefault();

    const ship = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    }

    this.props.addShip(ship);
    this.shipForm.reset();
  }

  render() {
    return (
      <form ref={(input) => this.shipForm = input} className="ship-edit" onSubmit={(e) => this.createShip(e)}>
        <input ref={(input) => this.name = input} type="text" placeholder="Ship Name" />
        <input ref={(input) => this.price = input} type="text" placeholder="Ship Price" />
        <select ref={(input) => this.status = input}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea ref={(input) => this.desc = input} type="text" placeholder="Ship Desc"></textarea>
        <input ref={(input) => this.image = input} type="text" placeholder="Ship Image" />
        <button type="submit">+ Add Item</button>
      </form>
    )
  }
}

AddShipForm.propTypes = {
  addShip: React.PropTypes.func.isRequired
}

export default AddShipForm;
