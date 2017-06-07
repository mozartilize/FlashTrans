import React from 'react';

import appApi from 'services/app-api';

export default class Service extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editable: props.currentUser ? props.currentUser.role.name === 'admin' : false,
      name: this.props.service.name,
      description: this.props.service.description,
    }

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleEditClick(e) {
    this.setState({editing: !this.state.editing});
  }

  handleInputChange(e) {
    const target = e.target;
    let data = {};
    data[target.name] = target.value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    appApi.ready().put(`/services/${this.props.service.id}`,
                       {name: this.state.name, description: this.state.description})
      .then(res => {
        this.setState({editing: !this.state.editing});
      })
      .catch(err => {})
  }

  render() {
    return (
      this.state.editing ?
        <form onSubmit={this.handleSubmit}>
          <input type="submit" value="Update"/>
          <div className="form-group">
            <input required className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleInputChange}/>
            <textarea className="form-control" name="description" onChange={this.handleInputChange}>{this.state.description}</textarea>
          </div>
        </form> :
        <section>
          {
            this.state.editable ?
              <button onClick={this.handleEditClick}>Edit</button> : null
          }
          <h2>{this.state.name}</h2>
          <p>{this.state.description}</p>
        </section>
    )
  }
}
