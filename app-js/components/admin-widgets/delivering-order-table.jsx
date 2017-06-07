import React from 'react';

import appApi from 'services/app-api';
import HeadingPane from 'components/heading-pane';


export default class AssignedReadyOrderTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    appApi.ready().get('orders?status=delivering').then(res => {
      this.setState({orders: res.data});
    })
  }

  render() {
    return (
      <HeadingPane panelHeader="Delivering Shippers">
        <table className="table">
          <thead>
            <tr>
              <th>Shipper</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.orders.map(order => (
                <tr key={order.id}>
                  <td>{order.shipment.shipper.full_name}</td>
                  <td>{`${order.source_address.street_no} ${order.source_address.street_name}, ${order.source_address.city.name}`}</td>
                  <td>{`${order.destination_address.street_no} ${order.destination_address.street_name}, ${order.destination_address.city.name}`}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </HeadingPane>
    )
  }
}
