import React from 'react';
import _ from 'lodash';

import appApi from 'services/app-api';

import ServiceRateTable from './service-rate-table';
import AddRateRow from './add-rate-row';

export default class ServiceRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      areas: props.areas,
      service: props.service,
      weights: props.weights,
      rates: props.rates,
      add: this.initAdd(props),
      editStatus: this.initEditStatus(props),
      editedRates: [],
    }

    this.addWeightChange  = this.addWeightChange.bind(this);
    this.addRateChange    = this.addRateChange.bind(this);
    this.addWeightRate    = this.addWeightRate.bind(this);
    this.weightChangeHandle = this.weightChangeHandle.bind(this);
    this.rateChangeHandle   = this.rateChangeHandle.bind(this);
    this.weightRowEditHandle = this.weightRowEditHandle.bind(this);
    this.weightRowDeleteHandle = this.weightRowDeleteHandle.bind(this);
  }

  initAdd(props) {
    let add = {
      service_id: props.service.id,
      weight: '',
      bonus: false,
      rates: []
    }

    _.forEach(props.areas, area => {
      add.rates.push({price: '', destination_area_id: area.id})
    })

    return add;
  }

  initEditStatus(props) {
    let editStatus = {};
    _.each(props.weights, weight => {editStatus[weight.id] = false});
    return editStatus;
  }

  addRateChange(e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let newAdd = _.clone(prevState.add);
      let rate = _.find(newAdd.rates, rate => (rate.destination_area_id == target.getAttribute('data-destination-area-id')));
      rate.price = target.value;
      return {add: newAdd};
    })
  }

  addWeightChange(e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let newAdd = _.clone(prevState.add);
      newAdd.weight = target.value;
      return {add: newAdd};
    })
  }

  addWeightRate(e) {
    appApi.ready().post('/weights', { add: this.state.add}).then(res => {
      this.setState((prevState, props) => {
        prevState.weights.push(_.omit(res.data, ['rates']));

        return {
          weights: prevState.weights,
          rates: prevState.rates.concat(res.data.rates),
          add: this.initAdd(this.props)
        }
      })
    }).catch(error => {

    })
  }

  weightChangeHandle(e) {
    const target = e.target;
    const weightId = target.getAttribute('data-weight-id');
    this.setState((prevState, props) => {
      let newWeights = _.clone(prevState.weights);
      let weight = _.find(newWeights, (weight) => (weight.id == weightId));
      weight.weight = target.value;

      return {weights: newWeights};
    })
  }

  rateChangeHandle(e) {
    const target = e.target;
    const rateId = target.getAttribute('data-rate-id');
    let newRates = _.clone(this.state.rates);

    let rate = _.find(newRates, (rate) => (rate.id == rateId));
    rate.price = target.value;

    this.setState((prevState, props) => {
      // edit rate
      let newEditedRates = _.reject(prevState.editedRates, (rate) => (rate.id == rateId));
      newEditedRates.push(rate);
      return {editedRates: newEditedRates, rates: newRates};
    })
  }

  weightRowEditHandle(e) {
    const target = e.target;
    const weightId = target.getAttribute('data-weight-id');
    if (this.state.editStatus[weightId]) {
      const weight = _.find(this.state.weights, (weight) => (weight.id == weightId));
      const rates = _.filter(this.state.editedRates, rate => (rate.weight_id == weightId));
      appApi.ready()
        .put(`/weights/${weightId}`,
             {weight: weight, rates: rates})
        .then(res => {
          this.setState((prevState, props) => {
            prevState.editStatus[weightId] = false
            return {editStatus: prevState.editStatus}
          })
        })
        .catch(error => {

        })
    }
    else {
      this.setState((prevState, props) => {
        prevState.editStatus[weightId] = true
        return {editStatus: prevState.editStatus}
      })
    }
  }

  weightRowDeleteHandle(e) {
    const target = e.target;
    const weightId = target.getAttribute('data-weight-id');

    appApi.ready().delete(`/weights/${weightId}`).then(res => {
      this.setState((prevState, props) => (
        {weights: _.reject(prevState.weights, weight => (weight.id == weightId)),
         rates: _.reject(prevState.rates, rate => (rate.weight_id == weightId)),
         editedRates: _.reject(prevState.editedRates, rate => (rate.weight_id == weightId)),
         editStatus: _.omit(prevState.editStatus, [weightId])}
      ))
    })
    .catch(error => {
      alert(error.response.data.error)
    })
  }

  render() {
    return (
      <div>
        <ServiceRateTable service={this.state.service}
                          areas={this.state.areas}
                          weights={this.state.weights}
                          rates={this.state.rates}
                          editStatus={this.state.editStatus}
                          weightChangeHandle={this.weightChangeHandle}
                          rateChangeHandle={this.rateChangeHandle}
                          weightRowEditHandle={this.weightRowEditHandle}
                          weightRowDeleteHandle={this.weightRowDeleteHandle} />
        <AddRateRow add={this.state.add}
                    areas={this.state.areas}
                    addWeightChange={this.addWeightChange}
                    addRateChange={this.addRateChange}
                    addWeightRate={this.addWeightRate} />
      </div>
    );
  }
}
