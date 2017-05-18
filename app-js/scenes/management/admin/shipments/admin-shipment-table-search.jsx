import React from 'react';
import _ from 'lodash';

import SearchTable from 'components/search-table';
import AdminShipmentTable from './admin-shipment-table';
import AdminShipmentSearchForm from './admin-shipment-search-form';

export default class AdminShipmentTableSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtedOrders: props.orders
    }

    this.handleAdminShipmentSearch = this.handleAdminShipmentSearch.bind(this);
  }

  handleAdminShipmentSearch(e) {
    e.preventDefault();
    const form = e.target;
    const conditions = {
      service: form.elements['service'].value,
      code: form.elements['code'].value,
      customer: form.elements['customer'].value,
      sourceStreetName: form.elements['sourceStreetName'].value,
      sourceCity: form.elements['sourceCity'].value,
      destinationStreetName: form.elements['destinationStreetName'].value,
      destinationCity: form.elements['destinationCity'].value,
      createdFrom: form.elements['createdFrom'].value,
      createdTo: form.elements['createdTo'].value,
      shipper: form.elements['shipper'].value,
      status: form.elements['status'].value,
    }
    console.log(conditions);
    let newFiltedOrders = _.clone(this.props.orders);
    if (conditions.service !== '') newFiltedOrders = _.filter(newFiltedOrders, ['service.id', parseInt(conditions.service)])
    if (conditions.code !== '') newFiltedOrders = _.filter(newFiltedOrders, ['code', conditions.code])
    if (conditions.customer !== '') newFiltedOrders = _.filter(newFiltedOrders, order => (order.first_name.includes(conditions.customer) || order.last_name.includes(conditions.customer)))
    if (conditions.sourceStreetName !== '') newFiltedOrders = _.filter(newFiltedOrders, ['source_address.street_name', conditions.sourceStreetName]);
    if (conditions.sourceCity !== '') newFiltedOrders = _.filter(newFiltedOrders, ['source_address.city.name', conditions.sourceCity]);
    if (conditions.destinationStreetName !== '') newFiltedOrders = _.filter(newFiltedOrders, ['destination_address.street_name', conditions.destinationStreetName]);
    if (conditions.destinationCity !== '') newFiltedOrders = _.filter(newFiltedOrders, ['destination_address.city.name', conditions.destinationCity]);
    if (conditions.createdFrom !== '') newFiltedOrders = _.filter(newFiltedOrders, order => ((new Date(order.created_at)) >= (new Date(conditions.createdFrom))));
    if (conditions.createdTo !== '') newFiltedOrders = _.filter(newFiltedOrders, order => ((new Date(order.created_at)) <= (new Date(conditions.createdTo))));
    if (conditions.shipper !== '') newFiltedOrders = _.filter(newFiltedOrders, ['shipment.shipper.id', parseInt(conditions.shipper)]);
    if (conditions.status !== '') newFiltedOrders = _.filter(newFiltedOrders, ['status.id', parseInt(conditions.status)]);
    this.setState({filtedOrders: newFiltedOrders});
  }

  render() {
    return <SearchTable searchForm={<AdminShipmentSearchForm services={this.props.services}
                                                             shippers={this.props.shippers}
                                                             orderStatuses={this.props.orderStatuses}
                                                             handleAdminShipmentSearch={this.handleAdminShipmentSearch} />}
                        table={<AdminShipmentTable orders={this.state.filtedOrders}
                                                   shippers={this.props.shippers}
                                                   orderStatuses={this.props.orderStatuses}
                                                   handleShipmentShipperChange={this.props.handleShipmentShipperChange} />} />
  }
}
