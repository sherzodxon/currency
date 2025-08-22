import './index.scss'
import { useSelector } from "react-redux";
import TableItem from "../TableItem";
import { useState } from "react";
type HistoryTableProps = {data:Array<any>}

const HistoryTable:React.FC<HistoryTableProps> = ({data}) => {
    const theme= useSelector((state:any)=>state.theme.theme)
    const dark = theme == "dark";
    const [selected, setSelected] = useState<string | null>(null);
      const handleChange = (value: string) => {
    if (selected === value) {
     setSelected(null);
    } else {
      setSelected(value);
    }
  };
    return (
        <>
        {data.map((elements)=>
        <div className={`history-card ${dark?"history-card--dark":""}`} key={elements.date}>
             <input 
             type="radio" 
             value={`${elements.id}`} 
             checked={selected === `${elements.id}`} 
             className="history-input visually-hidden" 
             name="checkbox" 
             id={`${elements.id}`} 
             onClick={()=>handleChange(`${elements.id}`)}
             onChange={(e)=>console.log(e.target.checked)}/>
             <div className="history-wrapper">
             <label htmlFor={`${elements.id}`} className="history-table-label">{elements.date}</label>
             <div className="history-container">
               <ul className="history-list">
                {
                    elements.data.map((element:any)=><TableItem key={element.key} CcyNm_UZ={element.CcyNm_UZ} Buy={element.Rate} Ccy={element.Ccy} Sale={element.Rate} Diff={element.Diff} Rate={element.Rate}/>
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