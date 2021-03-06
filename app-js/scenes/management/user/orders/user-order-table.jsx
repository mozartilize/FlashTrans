import React from 'react';

const UserOrderTable = (props) => (
  <table className="table">
    <thead>
      <tr>
        <th>Id</th>
        <th>Order Code</th>
        <th>Source Address</th>
        <th>Destination Address</th>
        <th>Created at</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        props.orders.map(order => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.code}</td>
            <td>{`${order.source_address.street_no} ${order.source_address.street_name}, ${order.source_address.city.name}`}</td>
            <td>{`${order.destination_address.street_no} ${order.destination_address.street_name}, ${order.destination_address.city.name}`}</td>
            <td>{order.created_at}</td>
            {
              order.status.status === 'Unprocessed' ?
                <td className="text-nowrap">
                  <button onClick={e => props.handleEdit(order.id, props.history, e)}><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
                  <button onClick={e => props.handleDelete(order.id, e)}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
                </td>
              : <td>{order.status.status}</td>
            }
          </tr>
        ))
      }
    </tbody>
  </table>
)

export default UserOrderTable;
