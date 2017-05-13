import React from 'react';

const UserOrderSearchForm = (props) => (
  <form onSubmit={props.handleUserOrderSearch}>
    <table className="table">
      <tbody>
        <tr>
          <th>Source street name</th>
          <td><input className="form-control" type="text" name="sourceStreetName"/></td>
          <th>Source city</th>
          <td><input className="form-control" type="text" name="sourceCity"/></td>
        </tr>
        <tr>
          <th>Destination street name</th>
          <td><input className="form-control" type="text" name="destinationStreetName"/></td>
          <th>Destination City</th>
          <td><input className="form-control" type="text" name="destinationCity"/></td>
        </tr>
        <tr>
          <th>Created at</th>
          <td colSpan="3">
            <div className="form-inline">
              <label htmlFor="created-day">Day:</label><input className="form-control" type="number" min="1" max="31" name="createdDay" id="created-day"/>
              <label htmlFor="created-month">Month:</label><input className="form-control" type="number" min="1" max="12" name="createdMonth" id="created-month"/>
              <label htmlFor="created-year">Year:</label><input className="form-control" type="number" name="createdYear" id="created-year"/>
            </div>
          </td>
        </tr>
        <tr>
          <th>Status</th>
          <td colSpan="3"><div className="form-inline"><select className="form-control" name="status"></select></div></td>
        </tr>
      </tbody>
    </table>
    <button type="submit" className="button">Search</button>
  </form>
)

export default UserOrderSearchForm;
