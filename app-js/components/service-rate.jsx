import React from 'react';
import _ from 'lodash';

import ServiceRateTable from './service-rate-table';
import AddRateRow from './add-rate-row';

export default class ServiceRate extends React.Component {
  constructor(props) {
    super(props);

    let add = {
      service_id: props.service.id,
      weight: '',
      bonus: false,
      rates: []
    }

    _.forEach(props.areas, area => {
      add.rates.push({price: '', destination_area_id: area.id})
    })

    this.state = {
      areas: props.areas,
      service: props.service,
      weights: props.weights,
      rates: props.rates,
      add: add,
      editable: false,
      editedWeights: [],
      editedRates: [],
      addedRates: []
    }

    this.addWeightChange  = this.addWeightChange.bind(this);
    this.addRateChange    = this.addRateChange.bind(this);
    this.addWeightRate    = this.addWeightRate.bind(this);
    this.weightEdit       = this.weightEdit.bind(this);
    this.rateEdit         = this.rateEdit.bind(this);
    this.editableChange   = this.editableChange.bind(this);
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

  }

  weightEdit(e) {
    const target = e.target;
    const weightId = target.getAttribute('data-weight-id');
    this.setState((prevState, props) => {
      let newEditedWeights = _.reject(prevState.editedWeights, (weight) => (weight.id == weightId));
      newEditedWeights.push(
        {
          id: weightId,
          service_id: this.state.service.id,
          weight: target.value,
        }
      )

      let newWeights = _.clone(prevState.weights);
      let weight = _.find(newWeights, (weight) => (weight.id == weightId));
      weight.weight = target.value;

      return {editedWeights: newEditedWeights, weights: newWeights};
    })
  }

  rateEdit(e) {
    const target = e.target;
    const rateId = target.getAttribute('data-rate-id');
    let newRates = _.clone(this.state.rates);

    this.setState((prevState, props) => {
      // edit rate
      if (rateId) {
        let newEditedRates = _.reject(prevState.editedRates, (rate) => (rate.id == rateId));
        newEditedRates.push(
          {
            id: target.getAttribute('data-rate-id'),
            price: target.value,
          }
        )

        let rate = _.find(newRates, (rate) => (rate.id == rateId));
        rate.price = target.value;

        return {editedRates: newEditedRates, rates: newRates};
      }
      // create new one
      else {
        const weightId = target.getAttribute('data-weight-id');
        const destinationAreaId = target.getAttribute('data-destination-area-id');
        let newAddedRates = _.reject(prevState.addedRates, (rate) => (rate.weight_id == weightId && rate.destination_area_id == destinationAreaId));
        newAddedRates.push(
          {
            weight_id: weightId,
            destination_area_id: destinationAreaId,
            price: target.value
          }
        )

        let rate = _.find(newRates, (rate) => (rate.weight_id == weightId && rate.destination_area_id == destinationAreaId));
        if (rate) {
          rate.price = target.value;
        }
        else {
          newRates.push({price: target.value, weight_id: weightId, destination_area_id: destinationAreaId});
        }

        return {addedRates: newAddedRates, rates: newRates};
      }
    })
  }

  editableChange(e) {
    if (this.state.editable) {
      // do update
      this.setState({editable: false})
    }
    else {
      this.setState({editable: true})
    }
  }

  render() {
    return (
      <div>
        <ServiceRateTable service={this.state.service}
                          areas={this.state.areas}
                          weights={this.state.weights}
                          rates={this.state.rates}
                          editable={this.state.editable}
                          weightEdit={this.weightEdit}
                          rateEdit={this.rateEdit}
                          editableChange={this.editableChange} />
        <AddRateRow add={this.state.add}
                    areas={this.state.areas}
                    addWeightChange={this.addWeightChange}
                    addRateChange={this.addRateChange}
                    addWeightRate={this.addWeightRate} />
      </div>
    );
  }
}
