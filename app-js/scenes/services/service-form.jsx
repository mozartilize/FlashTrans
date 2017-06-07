import React from 'react';

import CustomForm from 'components/custom-form';


const ServiceForm = (props) => {
  let form = (
    <section>
      <div className="form-group">
        <lable>Name:</lable>
        <input required type="text" name="name" onChange={props.handleInputChange} className="form-control" value={props.service.name}/>
      </div>
      <div className="form-group">
        <lable>Code:</lable>
        <input required type="text" name="code" onChange={props.handleInputChange} className="form-control" value={props.service.code}/>
      </div>
      <div className="form-group">
        <lable>Description:</lable>
        <textarea required name="description" onChange={props.handleInputChange} className="form-control">{props.service.description}</textarea>
      </div>
      <input type="submit" value="Create"/>
    </section>
  )

  return <CustomForm errors={props.errors}
                     form={form}
                     onSubmit={(e) => props.handleSubmit(props.history, e)}/>
}

export default ServiceForm;
