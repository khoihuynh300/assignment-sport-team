import FilterField from '../FilterField/FilterField';
import filterStyles from './Filter.module.scss';

const Filter = ({ filters }) => {
  return (
    <div className={filterStyles['filter-wrapper']}>
      <div className={filterStyles['filter-header']}>
        <div className={filterStyles['bold-text']}>Filter</div>
        <div className={filterStyles['clear-filter']}>Clear</div>
      </div>
      <div>
        {filters.map((filter) => (
          <FilterField name={filter.name} selections={filter.selections} type={filter.type} />
        ))}
      </div>
    </div>
  );
};

export default Filter;
