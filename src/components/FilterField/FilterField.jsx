import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

import filterFieldStyles from './FilterField.module.scss';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import { setSelectedFilter } from '../../features/filter/filterSlice';

function FilterField({ filterKey, name, selections, type = 'checkbox' }) {
  const [collapsed, setCollapsed] = useState(false);
  // for expand/collapse field
  const collapseElement = useRef(0);
  let maxHeight = collapseElement.current.scrollHeight;

  const listChecked = useSelector((state) => state.filter.selectedFilters[filterKey]);
  const dispatch = useDispatch();

  const uniqueSelections = [...new Set(selections)];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onChangeCheckbox = (e) => {
    const value = e.target.value;
    if (listChecked.includes(value)) {
      const newListChecked = listChecked.filter((item) => item !== value);
      const filterField = {};
      filterField[filterKey] = newListChecked;
      dispatch(setSelectedFilter(filterField));
    } else {
      const filterField = {};
      filterField[filterKey] = [...listChecked, value];
      dispatch(setSelectedFilter(filterField));
    }
  };

  const onChangeRadio = (value) => {
    const filterField = {};
    filterField[filterKey] = value;
    dispatch(setSelectedFilter(filterField));
  };

  const renderSelections = () => {
    switch (type) {
      case 'radio':
        return (
          <ul>
            {uniqueSelections.map((selection, index) => {
              return (
                <li key={index}>
                  <Radio
                    value={selection.value}
                    name={name}
                    onChange={() => {
                      onChangeRadio(selection.value);
                    }}
                    checked={listChecked === selection.value}
                  >
                    {selection.name}
                  </Radio>
                </li>
              );
            })}
          </ul>
        );
      case 'checkbox':
      default:
        return (
          <ul>
            {uniqueSelections.map((selection) => {
              return (
                <li key={selection}>
                  <Checkbox
                    value={selection}
                    onChange={onChangeCheckbox}
                    checked={listChecked.includes(selection)}
                  >
                    {selection}
                  </Checkbox>
                </li>
              );
            })}
          </ul>
        );
    }
  };

  return (
    <div className={filterFieldStyles['wrapper']}>
      <div className={filterFieldStyles['header']}>
        <div className={filterFieldStyles['field-name']}>{name}</div>
        <div
          className={`${filterFieldStyles['collapse-field']} 
                      ${collapsed && filterFieldStyles['collapsed']} 
                      no-select`}
          onClick={toggleCollapsed}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
      <div
        className={`${filterFieldStyles['content']} ${collapsed && filterFieldStyles['collapsed']}`}
        ref={collapseElement}
        style={{ maxHeight: !collapsed && maxHeight ? maxHeight : 'auto' }}
      >
        {renderSelections()}
      </div>
    </div>
  );
}

export default FilterField;
