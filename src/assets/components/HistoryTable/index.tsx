import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { getFirstTwoLetters } from "../../../functions";
import './index.scss'
import { useSelector } from "react-redux";
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
    const columns : ColumnsType < Currency > = [
        {
            dataIndex: 'CcyNm_UZ',
            key: 'name',
        }, 
        {
            dataIndex: 'Ccy',
            key: 'code',
            render:(ccy)=>(
                <div className='table-name-wrapper'>
                    <div className='table-flag' style={{backgroundImage:`url('https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(ccy)}.svg')`}}></div>
                    <p className='table-currency-name'>{ccy}</p>
                   
                </div>
            )
        }, {
            dataIndex: 'Rate',
            key: 'rate',
        }, 
        {
            dataIndex: 'Date',
            key: 'date'
        }
      ];  
    return (
        <>
        {data.map((elements)=>
        <div className="history-card" key={elements.date}>
           
             <input type="radio" className="history-input visually-hidden" name="checkbox" id={elements.date}/>
             <div className="history-wrapper">
             <label style={{color:theme==="dark"?"#848484":"#111C42"}} htmlFor={elements.date} className="history-label">{elements.date}</label>
             <div className="history-container">
                <Table columns={columns} dataSource={elements.data} pagination={false}  className={theme==="dark"?"dark-table history-table":"light-table history-table"}/>
             </div>
             </div>
             
        </div>
    )}
        </>
    );
}
 
 
export default HistoryTable;