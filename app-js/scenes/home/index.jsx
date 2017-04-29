import React from 'react';
import ReactDOM from 'react-dom';
import User from 'services/user';

import MainNavbar from 'components/navbar/main-navbar'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser
    }
  }

  render() {
    return (
      <div>
        <MainNavbar currentUser={this.state.currentUser} />
      </div>
    )
  }
}

User.getCurrentUser().then((response) => {
    ReactDOM.render(<App currentUser={response.data.data}/>,
                    document.getElementById('app'));
  })
  .catch((error) => {});
