import React from 'react';

import appApi from 'services/app-api';

import CompletedReadyOrderTable from 'components/admin-widgets/completed-ready-order-table';
import AssignedReadyOrderTable from 'components/admin-widgets/assigned-ready-order-table';
import DeliveringOrderTable from 'components/admin-widgets/delivering-order-table';
import OrderStat from 'components/admin-widgets/order-stat';

export default class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatuses: [],
      shippers: []
    }
  }

  componentDidMount() {
    appApi.ready().get('/order-statuses').then(res => {
      this.setState({orderStatuses: res.data});
    })

    appApi.ready().get('/shippers').then(res => {
      this.setState({shippers: res.data.data});
    })
  }

  render() {
    return (
      <div>
        <div>
          <CompletedReadyOrderTable orderStatuses={this.state.orderStatuses} />
        </div>
        <div className="col-md-6">
          <AssignedReadyOrderTable orderStatuses={this.state.orderStatuses}
                                   shippers={this.state.shippers} />
        </div>
        <div className="col-md-6">
          <DeliveringOrderTable />
        </div>
        <div className="col-md-6">
          <OrderStat />
        </div>
      </div>
    )
  }
}
