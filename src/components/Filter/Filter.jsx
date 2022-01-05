import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import actions from '../../redux/contacts/contacts-actions';
import s from './Filter.module.css';

export default function Filter() {
  const value = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <div className={s.filter}>
      <label className={s.label}>
        Filter by name
        <div className={s.wrapper}>
          <DebounceInput
            debounceTimeout={500}
            className={s.input}
            type="text"
            value={value}
            onChange={e => dispatch(actions.filter(e.target.value))}
          />
          <span className={s.focusBorder}>
            <i />
          </span>
        </div>
      </label>
      <button
        className={s.button}
        type="button"
        onClick={() => dispatch(actions.filter(''))}
        disabled={value === ''}
      >
        <span className={s.buttonName}>clear</span>
      </button>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
