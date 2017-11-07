import React from 'react';
import { getFunName } from '../helpers';

class DepotPicker extends React.Component {
  goToDepot(event) {
    event.preventDefault();
    const storeID = this.depotInput.value
    if (storeID === 'obnoxious-scary-men') {
      alert('GTFO');
    }
    else {
      this.context.router.transitionTo(`/store/${storeID}`);
    }
  }

  render() {
    return (
      <form className="depot-selector" onSubmit={(e) => this.goToDepot(e) } >
        { /* Hello */ }
        <h2>Please Enter A Depot</h2>
        <input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={(input) => { this.depotInput = input} } />
        <button type="submit">Visit Depot →</button>
      </form>
    );
  }
}

DepotPicker.contextTypes = {
  router: React.PropTypes.object
}

export default DepotPicker;
