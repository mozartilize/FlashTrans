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
    if (this.state.editing) {
      const weight = this.props.weight;
      const rates = _.filter(this.props.editedRates, ['weight_id', weight.id]);
      appApi.ready()
        .put(`/weights/${weight.id}`,
             {weight: weight, rates: rates})
        .then(res => {
          this.setState({editing: !this.state.editing});
        })
        .catch(error => {
          alert('Invalid');
        })
    }
    else {
      this.setState({editing: !this.state.editing});
    }
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
