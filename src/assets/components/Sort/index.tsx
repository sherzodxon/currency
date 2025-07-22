import { useSelector } from 'react-redux';
import { getFirstTwoLetters } from '../../../functions';
import './index.scss'
type SortProps = {
    open:Boolean;
    options:object[];
    defaultValue:string;
    name:string;
    // className:string;
    close:()=>void;
    handleOptionChange:(evt:any)=>void
}
 
const Sort:React.FC<SortProps> = ({open,options,defaultValue,name,handleOptionChange,close}) => {
   const theme= useSelector((state:any)=>state.theme.theme);
   const dark = theme === 'dark'
    return (
      <ul onChange={handleOptionChange} className={`${dark?"sort-list sort-list--dark":"sort-list"}  ${open?"sort-list--opened":"sort-list--closed"}`}>
         {
            options.map((option:any)=>(
            <li key={option.key} className="sort-item">
             <label className="sort-option-label" onClick={close} htmlFor={option.Ccy}>
                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(option.Ccy)}.svg`} alt="flag" width="25" height="25" className="sort-item-img" />
                <input type="radio" id={option.Ccy} className="sort-option-radio visually-hidden" defaultChecked={defaultValue===option.Ccy} name={name} defaultValue={option.Ccy}/>
                {option.Ccy}
                <span className="sort-option-tick"></span>
             </label>
            </li>))
         }
      </ul>
    );
}
 
 
export default Sort;