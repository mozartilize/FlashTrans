import React from 'react';
import appApi from 'services/app-api';

import OrderInfo from './order-info';

export default class QuickTrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      order: null,
      error: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    e.preventDefault();
    if (this.state.code) {
      appApi.ready().get(`/orders/${this.state.code}`).then(res => {
        this.setState({order: res.data});
      }).catch(err => {
        this.setState({order: null});
        this.setState({error: 'Not found'})
      })
    }
  }

  render() {
    return (
      <div className="jumbotron" style={{float: "none", margin: "0 auto"}}>
        <div className="text-center"><h2>Have an order? Track it now!</h2></div>
        <form onSubmit={this.handleSearch} style={{'margin': "20px 0"}}>
          <div className="form-inline text-center">
            <input placeholder="Enter order code" type="text" className="form-control" value={this.state.code}
                   onChange={e => this.setState({code: e.target.value})}/>
            <input style={{'margin': "0 15px"}} className="btn btn-primary form-control" type="submit" value="Search" disabled={!this.state.code} />
          </div>
        </form>
        {
          this.state.error ?
            <div className="alert alert-danger" role="alert">{this.state.error}</div> :
            null
        }
        {
          this.state.order ?
            <OrderInfo order={this.state.order} /> : null
        }
      </div>
    )
  }
}
