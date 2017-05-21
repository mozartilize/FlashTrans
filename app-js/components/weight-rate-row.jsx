import React from 'react';
import _ from 'lodash';

export default class WeightRateRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }

    this.handleWeightOnEdit = this.handleWeightOnEdit.bind(this);
  }

  handleWeightOnEdit(e) {
    this.setState({editing: !this.state.editing});
    // const target = e.target;
    // const weightId = target.getAttribute('data-weight-id');
    // if (this.state.editStatus[weightId]) {
    //   const weight = _.find(this.state.weights, (weight) => (weight.id == weightId));
    //   const rates = _.filter(this.state.editedRates, rate => (rate.weight_id == weightId));
    //   appApi.ready()
    //     .put(`/weights/${weightId}`,
    //          {weight: weight, rates: rates})
    //     .then(res => {
    //       this.setState((prevState, props) => {
    //         prevState.editStatus[weightId] = false
    //         return {editStatus: prevState.editStatus}
    //       })
    //     })
    //     .catch(error => {

    //     })
    // }
    // else {
    //   this.setState((prevState, props) => {
    //     prevState.editStatus[weightId] = true
    //     return {editStatus: prevState.editStatus}
    //   })
    // }
  }

  render() {
    return (
      <tr>
        <td className="text-nowrap">
          <button onClick={this.handleWeightOnEdit}>
            {
              this.state.editing ?
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span> :
              <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            }
          </button>
          <button onClick={(e) => this.props.handleWeightOnDelete(this.props.weight.id, e)}>
            <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
          </button>
        </td>
        <td>
          <div>
            {
              this.state.editing ?
              <input
                onChange={(e) => this.props.handleWeightChange(this.props.weight.id, e)}
                onBlur={e => this.props.handleWeightOnBlur(this.props.weight.id, this.props.weight.bonus, e)}
                value={this.props.weight.weight}/> :
              this.props.weight.weight
            }
          </div>
          <div className="form-inline">
            <span>Bonus:</span>
            <input type="checkbox" className="form-control" readOnly disabled checked={this.props.weight.bonus} />
          </div>
        </td>
        {
          this.props.areas.map(area => {
            const rate = _.find(this.props.rates, rate => (rate.destination_area_id == area.id && rate.weight_id == this.props.weight.id));
            let price = rate ? rate.price : '';
            const rateInfo = {
              weightId: this.props.weight.id,
              destinationAreaId: area.id,
              rateId: rate ? rate.id : null
            }
            return (
              this.state.editing ?
              <td key={area.code}>
                <input onChange={(e) => this.props.handleRateChange(rateInfo, e)}
                       onBlur={(e) => this.props.handleRateOnBlur(rateInfo, this.props.weight.bonus, e)}
                       value={price}/>
              </td> :
              <td key={area.code}>{price}</td>
            )
          })
        }
      </tr>
    )
  }
}
