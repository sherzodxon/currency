import { useSelector } from 'react-redux';
import { getFirstTwoLetters } from '../../../functions';
import './index.scss';

type Currency = {
  Ccy: string;
  Rate: number;
};

type SortProps = {
  open: boolean;
  options: Currency[];
  defaultValue: string;
  name: string;
  close: () => void;
  handleOptionChange: (ccy: string) => void;
};

const Sort: React.FC<SortProps> = ({
  open,
  options,
  defaultValue,
  name,
  handleOptionChange,
  close
}) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const dark = theme === 'dark';

  return (
    <ul className={`${dark ? 'sort-list sort-list--dark' : 'sort-list'} ${open ? 'sort-list--opened' : 'sort-list--closed'}`}>
      {options.map((option) => (
        <li key={option.Ccy} className="sort-item">
          <label className="sort-option-label" htmlFor={`${name}-${option.Ccy}`}>
            <img
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(option.Ccy)}.svg`}
              alt="flag"
              width="25"
              height="25"
              className="sort-item-img"
            />
            <input
              type="radio"
              id={`${name}-${option.Ccy}`}
              className="sort-option-radio visually-hidden"
              checked={defaultValue === option.Ccy}
              name={name}
              value={option.Ccy}
              onChange={(e) => {
                handleOptionChange(e.target.value);
                close();
              }}
            />
            {option.Ccy}
            <span className="sort-option-tick"></span>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Sort;
