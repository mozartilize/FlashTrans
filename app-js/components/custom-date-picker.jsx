import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import datepickerCSS from 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = (props) => (
  <DatePicker
    dateFormat="YYYY-MM-DD"
    selected={props.selected}
    onChange={props.onChange}
    className={props.className}
    name={props.name}
    peekNextMonth
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
    maxDate={moment()} />
);

export default CustomDatePicker;
