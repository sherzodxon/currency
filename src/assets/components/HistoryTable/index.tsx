import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { getFirstTwoLetters } from "../../../functions";
import './index.scss'
import { useSelector } from "react-redux";
import TableItem from "../TableItem";
type HistoryTableProps = {data:Array<any>}
 
interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
  }
const HistoryTable:React.FC<HistoryTableProps> = ({data}) => {
    const theme= useSelector((state:any)=>state.theme.theme)
    
    return (
        <>
        {data.map((elements)=>
        <div className="history-card" key={elements.date}>
           
             <input type="radio" className="history-input visually-hidden" name="checkbox" id={elements.date}/>
             <div className="history-wrapper">
             <label style={{color:theme==="dark"?"#848484":"#111C42"}} htmlFor={elements.date} className="history-table-label">{elements.date}</label>
             <div className="history-container">
               <ul className="history-list">
                {
                    elements.data.map((element:any)=><TableItem CcyNm_UZ={element.CcyNm_UZ} Buy={element.Rate} Ccy={element.Ccy} Sale={element.Rate} Diff={element.Diff} Rate={element.Rate}/>
                    )
                }
               </ul>
             </div>
             </div>
             
        </div>
    )}
        </>
    );
}
 
 
export default HistoryTable;