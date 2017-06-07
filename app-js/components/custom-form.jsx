import React from 'react';
import _ from 'lodash';

const CustomForm = (props) => (
  <form className={props.className} method="post" onSubmit={props.onSubmit}>
    {
      props.header ? <h2>{props.header}</h2> : null
    }
    {
      props.errors ?
      <div className="alert alert-danger" role="alert">
        {
          _.isArray(props.errors) ?
            props.errors.length > 1 ?
            <ul>
              {props.errors.map((error, indx) => (<li key={indx}>{error}</li>))}
            </ul> : props.errors[0] :
          props.errors
        }
      </div> :
      null
    }
    {props.form}
  </form>
)

export default CustomForm;
