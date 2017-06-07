import React from 'react';

import appApi from 'services/app-api';

import QuickTrackOrder from 'components/quick-track-order';

export default class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderPerDay: '',
      deliveredPerDay: '',
      numberOfShipper: '',
      notableServices: []
    }
  }

  componentDidMount() {
    appApi.ready().get('/orders/per-day-stat').then(res => {
      this.setState({orderPerDay: res.data.order_per_day,
                     deliveredPerDay: res.data.delivered_per_day})
    })

    appApi.ready().get('/shippers/count').then(res => {
      this.setState({numberOfShipper: res.data.count})
    })

    appApi.ready().get('/services?notable=true').then(res => {
      this.setState({notableServices: res.data})
    })
  }

  render() {
    return (
      <div>
        <section>
          <QuickTrackOrder />
        </section>
        <section className="text-center banner" id="delivery-1">
          <h1><strong>Fast. Trustable. Secure</strong></h1>
          <h3>We receive over {this.state.orderPerDay} orders and delivery about {this.state.deliveredPerDay} orders everyday</h3>
        </section>
        <section className="text-center banner-sm">
          <h2>Check out the services suitable to you</h2>
          {
            this.state.notableServices.map(service => (
              <div key={service.id} className="text-center col-md-4">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
            ))
          }
          <div className="clearfix"></div>
          <div className="text-center"><a className="btn btn-primary" role="button" href="/services">See all</a></div>
        </section>
        <section className="text-center banner" id="delivery-2">
          <h1>Enthusiastic. Devoted. Friendly</h1>
          <h2>Our {this.state.numberOfShipper} shippers always ready for you</h2>
        </section>
      </div>
    )
  }
}
