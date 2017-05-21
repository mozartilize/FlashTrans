import React from 'react';
import ReactDOM from 'react-dom';
import User from 'services/user';

import BaseApp from 'layouts/base';

import QuickTrackOrder from 'components/quick-track-order';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    }
  }

  render() {
    return (
      <BaseApp currentUser={this.state.currentUser}>
        <QuickTrackOrder />
      </BaseApp>
    )
  }
}

User.getCurrentUser().then((response) => {
    ReactDOM.render(<App currentUser={response.data.data}/>,
                    document.getElementById('app'));
  })
  .catch((error) => {
    ReactDOM.render(<App currentUser={null}/>,
                    document.getElementById('app'));
  });
