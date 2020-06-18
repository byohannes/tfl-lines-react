import React from 'react';

const Dropdown = ({defaultOption, options, labelFieldName, changeHandler}) => {
  return (
    <select
      className="select-menu"
      onChange={event => changeHandler (event.target.value)}
    >
      <option value={defaultOption}>
        {defaultOption}
      </option>
      {options.map ((item, index) => (
        <option key={index} value={item[labelFieldName]}>
          {item[labelFieldName]}
        </option>
      ))}
    </select>
  );
};
export default Dropdown;
