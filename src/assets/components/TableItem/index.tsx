import { useSelector } from "react-redux";
import { getFirstTwoLetters } from "../../../functions";

type TableItemProps = {
  CcyNm_UZ: string;
  Rate: number;
  Buy: number;
  Sale: number;
  Ccy: string;
  Diff: string;
};

const TableItem: React.FC<TableItemProps> = ({ CcyNm_UZ, Rate, Buy, Sale, Ccy, Diff }) => {
  const theme = useSelector((state: any) => state.theme.theme);
  const dark = theme === "dark";
  const diff = Number(Diff)>0;
    return (
        <li className ={`table-item ${dark?"table-item--dark":"table-item--light"}`}>
                        <div className="table-item-head">
                            <div className="table-item-ccy-wrapper">
                                <img src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(Ccy)}.svg`} alt="flag" width="30" height="30" className="table-item-img" />
                                <p className="table-item-ccy">{Ccy}</p>
                            </div>
                           <div className="table-item-diff-section">
                             <p className={`table-item-diff ${diff?"table-item-diff--up":"table-item-diff--down"}`}>{`${diff?Diff:Number(Diff)*(-1)}`}</p>
                             <p className="table-item-ccyuz">{CcyNm_UZ}</p>
                           </div>
                        </div>
                        <div className="table-item-body">
                            <div className="table-item-section">
                                <p className='table-item-section-name'>MB kursi</p>
                                 <p className="table-item-rate">{Rate}</p>
                            </div>
                            <div className="table-item-section">
                                <p className='table-item-section-name'>Sotib olish</p>
                                 <p className="table-item-rate">{Buy}</p>
                            </div>
                            <div className="table-item-section">
                                <p className='table-item-section-name'>Sotish</p>
                                 <p className="table-item-rate">{Sale}</p>
                            </div>
                        </div>
        </li>
    );
}
 
 
export default TableItem;