import React from 'react';
import _ from 'lodash';

import appApi from 'services/app-api';

import ServiceRateTable from './service-rate-table';

export default class ServiceRate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weights: props.weights,
      rates: props.rates,
      add: this.initAdd(props),
      editedRates: [],
    }

    this.handleAddingWeightChange = this.handleAddingWeightChange.bind(this);
    this.handleAddingRateChange   = this.handleAddingRateChange.bind(this);
    this.handleAddWeightRate      = this.handleAddWeightRate.bind(this);
    this.handleWeightChange       = this.handleWeightChange.bind(this);
    this.handleWeightOnBlur       = this.handleWeightOnBlur.bind(this);
    this.handleRateChange         = this.handleRateChange.bind(this);
    this.handleRateOnBlur         = this.handleRateOnBlur.bind(this);
    this.handleWeightOnDelete     = this.handleWeightOnDelete.bind(this);
  }

  initAdd(props) {

    let add = {
      service_id: props.service.id,
      weight: '',
      bonus: !_.find(props.weights, ['bonus', true]),
      rates: []
    }

    _.forEach(props.areas, area => {
      add.rates.push({price: '', destination_area_id: area.id})
    })

    return add;
  }

  handleAddingRateChange(destinationAreaId, e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let newAdd = prevState.add;
      let rate = _.find(newAdd.rates, rate => (rate.destination_area_id == destinationAreaId));
      rate.price = parseFloat(target.value);
      return {add: newAdd};
    })
  }

  handleAddingWeightChange(e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let newAdd = prevState.add;
      newAdd.weight = parseFloat(target.value);
      return {add: newAdd};
    })
  }

  handleAddWeightRate(e) {
    appApi.ready().post('/weights', { add: this.state.add}).then(res => {
      this.setState((prevState, props) => {
        if (this.state.add.bonus) {
          prevState.weights.push(_.omit(res.data, ['rates']));
        }
        else {
          const nonBonusWeights = _.filter(prevState.weights, ['bonus', false]);
          // the index will be inserted to
          let indx = _.sortedIndexBy(nonBonusWeights, _.omit(this.state.add, ['rates']), 'weight');
          prevState.weights.splice(indx, 0, _.omit(res.data, ['rates']));
        }

        return {
          weights: prevState.weights,
          rates: prevState.rates.concat(res.data.rates),
          add: this.initAdd(this.props)
        }
      })
    }).catch(error => {
      alert('Invalid');
    })
  }

  handleWeightChange(weightId, e) {
    const target = e.target;
    this.setState((prevState, props) => {
      let newWeights = prevState.weights;
      let weight = _.find(newWeights, (weight) => (weight.id == weightId));
      weight.weight = target.value;

      return {weights: newWeights};
    })
  }

  // validate weight must be between before and after weights
  handleWeightOnBlur(weightId, bonus, e) {
    const target = e.target;
    if (!bonus) {
      const index = _.findIndex(this.state.weights, ['id', weightId]);
      if (index > 0 && parseFloat(target.value) <= this.state.weights[index-1].weight ||
          index < this.state.weights.length - 1 && parseFloat(target.value) >= this.state.weights[index+1].weight) {
        alert('Weight must be between before and after weights');
        this.setState((prevState, props) => {
          let newWeights = prevState.weights;
          let weight = _.find(newWeights, (weight) => (weight.id == weightId));
          weight.weight = '';
          return {weights: newWeights};
        })
      }
    }
  }

  handleRateChange(rateInfo, e) {
    const target = e.target;

    this.setState((prevState, props) => {
      let rate = _.find(prevState.rates, rate => (
          rate.weight_id == rateInfo.weightId &&
          rate.destination_area_id == rateInfo.destinationAreaId
        ));
      rate.price = parseFloat(target.value);
      // edit rate
      let newEditedRates = _.reject(prevState.editedRates, (rate) => (
          rate.weight_id == rateInfo.weightId &&
          rate.destination_area_id == rateInfo.destinationAreaId
        ));
      newEditedRates.push(rate);
      return {editedRates: newEditedRates, rates: prevState.rates};
    })
  }

  handleRateOnBlur(rateInfo, bonus, e) {
    const target = e.target;
    if (!bonus) {
      const nonBonusWeightIds = _.filter(this.state.weights, ['bonus', false]).map(weight => weight.id);
      const nonBonusSameAreaRates = nonBonusWeightIds.map(id => (
          _.find(this.state.rates, ['weight_id', id])
        ));
      const index = _.findIndex(nonBonusSameAreaRates, rate => (
          rate.weight_id == rateInfo.weightId &&
          rate.destination_area_id == rateInfo.destinationAreaId
        ));
      if (index > 0 && parseFloat(target.value) < nonBonusSameAreaRates[index-1].price ||
          index < nonBonusSameAreaRates.length - 1 && parseFloat(target.value) > nonBonusSameAreaRates[index+1].price) {
        alert('Price must be between before and after prices');
        this.setState((prevState, props) => {
          let newRates = prevState.rates;
          let rate = _.find(newRates, ['id', rateInfo.rateId]);
          rate.price = '';
          return {rates: newRates};
        })
      }
    }
  }

  handleWeightOnDelete(weightId, e) {
    const target = e.target;
    if (confirm('Are you sure to delete it?')) {
      appApi.ready().delete(`/weights/${weightId}`).then(res => {
        this.setState((prevState, props) => (
          {
            weights: _.reject(prevState.weights, weight => (weight.id == weightId)),
            rates: _.reject(prevState.rates, rate => (rate.weight_id == weightId)),
            editedRates: _.reject(prevState.editedRates, rate => (rate.weight_id == weightId)),
            add: this.initAdd(this.props)
          }
        ))
      })
      .catch(error => {
        alert(error.response.data.error)
      })
    }
  }

  render() {
    return (
      <div>
        <ServiceRateTable service={this.props.service}
                          areas={this.props.areas}
                          weights={this.state.weights}
                          rates={this.state.rates}
                          handleWeightChange={this.handleWeightChange}
                          handleWeightOnBlur={this.handleWeightOnBlur}
                          handleRateChange={this.handleRateChange}
                          handleRateOnBlur={this.handleRateOnBlur}
                          handleWeightOnDelete={this.handleWeightOnDelete}
                          add={this.state.add}
                          handleAddingWeightChange={this.handleAddingWeightChange}
                          handleAddingRateChange={this.handleAddingRateChange}
                          handleAddWeightRate={this.handleAddWeightRate} />
      </div>
    );
  }
}
