import React from 'react';
import _ from 'lodash';

import SearchTable from 'components/search-table';
import UserOrderTable from './user-order-table';
import UserOrderSearchForm from './user-order-search-form';

export default class UserOrderTableSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtedOrders: props.orders
    }

    this.handleUserOrderSearch = this.handleUserOrderSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({filtedOrders: nextProps.orders});
  }

  handleUserOrderSearch(e) {
    e.preventDefault();
    const form = e.target;
    const conditions = {
      sourceStreetName: form.elements['sourceStreetName'].value,
      sourceCity: form.elements['sourceCity'].value,
      destinationStreetName: form.elements['destinationStreetName'].value,
      destinationCity: form.elements['destinationCity'].value,
      createdDay: form.elements['createdDay'].value,
      createdMonth: form.elements['createdMonth'].value,
      createdYear: form.elements['createdYear'].value,
      status: form.elements['status'].value,
    }
    let newFiltedOrders = _.clone(this.props.orders);
    if (conditions.sourceStreetName !== '') newFiltedOrders = _.filter(newFiltedOrders, ['source_address.street_name', conditions.sourceStreetName]);
    if (conditions.sourceCity !== '') newFiltedOrders = _.filter(newFiltedOrders, ['source_address.city.name', conditions.sourceCity]);
    if (conditions.destinationStreetName !== '') newFiltedOrders = _.filter(newFiltedOrders, ['destination_address.street_name', conditions.destinationStreetName]);
    if (conditions.destinationCity !== '') newFiltedOrders = _.filter(newFiltedOrders, ['destination_address.city.name', conditions.destinationCity]);
    if (conditions.createdDay !== '') newFiltedOrders = _.filter(newFiltedOrders, order => ((new Date(order.created_at)).getDate() == conditions.createdDay));
    if (conditions.createdMonth !== '') newFiltedOrders = _.filter(newFiltedOrders, order => ((new Date(order.created_at)).getMonth() == conditions.createdMonth));
    if (conditions.createdYear !== '') newFiltedOrders = _.filter(newFiltedOrders, order => ((new Date(order.created_at)).getFullYear() == conditions.createdYear));
    this.setState({filtedOrders: newFiltedOrders});
  }

  render() {
    return <SearchTable searchForm={<UserOrderSearchForm
                                      orderStatuses={this.props.orderStatuses}
                                      handleUserOrderSearch={this.handleUserOrderSearch} />}
                        table={<UserOrderTable history={this.props.history}
                                               orders={this.state.filtedOrders}
                                               handleEdit={this.props.handleEdit}
                                               handleDelete={this.props.handleDelete} />} />
  }
}
