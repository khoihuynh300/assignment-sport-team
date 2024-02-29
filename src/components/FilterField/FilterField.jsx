import { useState } from 'react';
import { Checkbox, Radio, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

import filterFieldStyles from './FilterField.module.scss';

const FilterField = ({ name, selections, type = 'checkbox' }) => {
  let initialValue = [];
  if (type === 'radio') {
    initialValue = 0;
  }
  const [value, setValue] = useState(initialValue);
  const [collapsed, setCollapsed] = useState(false);

  const uniqueSelections = [...new Set(selections)];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onChange = (val) => {
    setValue(val);
  };

  const renderSelections = () => {
    switch (type) {
      case 'radio':
        return (
          <Radio.Group
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={value}
          >
            <Space direction="vertical">
              {uniqueSelections.map((selection, index) => {
                return (
                  <li key={selection}>
                    <Radio value={index}>{selection}</Radio>
                  </li>
                );
              })}
            </Space>
          </Radio.Group>
        );
      case 'checkbox':
      default:
        return (
          <Checkbox.Group onChange={onChange}>
            <ul>
              {uniqueSelections.map((selection) => {
                return (
                  <li key={selection}>
                    <Checkbox value={selection}>{selection}</Checkbox>
                  </li>
                );
              })}
            </ul>
          </Checkbox.Group>
        );
    }
  };

  return (
    <div className={filterFieldStyles['wrapper']}>
      <div className={filterFieldStyles['header']}>
        <div className={filterFieldStyles['field-name']}>{name}</div>
        <div
          className={`${filterFieldStyles['collapse-field']} ${
            collapsed && filterFieldStyles['collapsed']
          }`}
          onClick={toggleCollapsed}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
      <div
        className={`${filterFieldStyles['content']} ${collapsed && filterFieldStyles['collapsed']}`}
      >
        {renderSelections()}
      </div>
    </div>
  );
};

export default FilterField;
