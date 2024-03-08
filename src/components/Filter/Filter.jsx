import { useDispatch } from 'react-redux';
import FilterField from '../FilterField/FilterField';
import filterStyles from './Filter.module.scss';
import { resetFilter } from '../../features/filter/filterSlice';

const Filter = ({ filters, setIsMobileFilterShow = () => {} }) => {
  const dispatch = useDispatch();

  const filterKeys = Object.keys(filters);

  const clearFilter = () => {
    dispatch(resetFilter());
  };

  return (
    <div
      className={filterStyles['filter-wrapper']}
      onClick={() => {
        setIsMobileFilterShow(false);
      }}
    >
      <div
        className={filterStyles['filter-inner']}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={filterStyles['filter-header']}>
          <div className={filterStyles['bold-text']}>Filter</div>
          <div className={filterStyles['clear-filter']} onClick={clearFilter}>
            Clear
          </div>
        </div>
        <div>
          {filterKeys.map((key) => {
            const filter = filters[key];
            return (
              <FilterField
                key={key}
                filterKey={key}
                name={filter.name}
                selections={filter.selections}
                type={filter.type}
              />
            );
          })}
        </div>
        <div className={filterStyles['filter-footer']}>
          <button
            onClick={() => {
              setIsMobileFilterShow(false);
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
