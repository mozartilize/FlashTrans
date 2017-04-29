import React from 'react';
import ReactDOM from 'react-dom';
import SignupForm from 'components/signup-form';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SignupForm />
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('app'))