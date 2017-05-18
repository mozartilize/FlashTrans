import React from 'react';
import _ from 'lodash';

import SearchTable from 'components/search-table';
import ShipperShipmentTable from './shipper-shipment-table';
import ShipperShipmentSearchForm from './shipper-shipment-search-form';

export default class ShipperShipmentTableSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtedOrders: props.orders
    }

    this.handleShipperShipmentSearch = this.handleShipperShipmentSearch.bind(this);
  }

  handleShipperShipmentSearch(e) {
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
    if (conditions.status !== '') newFiltedOrders = _.filter(newFiltedOrders, ['status.id', parseInt(conditions.status)]);
    this.setState({filtedOrders: newFiltedOrders});
  }

  render() {
    return <SearchTable searchForm={<ShipperShipmentSearchForm services={this.props.services}
                                                             shippers={this.props.shippers}
                                                             orderStatuses={this.props.orderStatuses}
                                                             handleShipperShipmentSearch={this.handleShipperShipmentSearch} />}
                        table={<ShipperShipmentTable orders={this.state.filtedOrders}
                                                   shippers={this.props.shippers}
                                                   orderStatuses={this.props.orderStatuses}
                                                   handleShipperDeliveryProcess={this.props.handleShipperDeliveryProcess} />} />
  }
}
