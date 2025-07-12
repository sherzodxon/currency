import React from 'react';
import {
    Button,
    Result,
    Skeleton,
} from "antd";
import {useEffect, useState} from "react";
import './index.scss'
import {useDataCurrency } from '../../../contexts/currencyProvider';

import TableItem from '../TableItem';
import { useSelector } from 'react-redux';
import { formatDateTime } from '../../../functions';


interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
    Buy: number;
    Sale: number;
}

const TableSection : React.FC = () => {
    const [data,setData] = useState < Currency[] > ([]);
    const {currencies} = useDataCurrency();
    const isLoading = useSelector((state:any)=>state.isLoading.loading);
    const theme= useSelector((state:any)=>state.theme.theme)
    const [searchData,setSearchData] = useState < Currency[] > ([]);
    const [searchValue,setSearchValue] = useState < String > ("")
    const [error,setError] = useState < Boolean > (false);
    const dark = theme ==="dark";
    const currentDate = currencies[0]?.Date;
   
    useEffect(() => {
        if (searchData.length) {
            setData(searchData);
        } else 
            setData(currencies)
          
    }, [currencies, searchValue]);

    function handleSearchInput(e:any) {
            const searchValue : any = e.target.value
            setSearchValue(searchValue)
            const foundData = currencies.filter((el) => {
                const searchRegExp = new RegExp(searchValue, "gi");
                const searchText = `${el.CcyNm_UZ}`;
                return searchText.match(searchRegExp);

            })
            setSearchData(foundData);
    }
   
    if (error) {
        return(<Result 
            status="404"
            title="403" 
            subTitle="Iltimos! Qaytadan urinib ko'ring."
            extra={<Button 
            onClick={()=>window.location.reload()} 
            type="primary">Qayta boshlash</Button>}/>     
        ) } 
    else
    return (
        <div>
                <div className="table-head">
                    <div className={`table-input-group ${dark?"table-input-group--dark":"table-input-group--light"}`}>
                         <input className='table-search-input' placeholder='Valyuta qidirish' type="text" onChange={handleSearchInput} />
                    </div>
                    <div className={`table-date ${dark?"table-date--dark":"table-date--light"}`}>Oxirgi yangilanish: {`${isLoading?"--:--":`${formatDateTime(currentDate)}`}`}</div>
                </div>
                 <Skeleton loading={isLoading} active>
                 <ul className="table-list">
                   {data.map(element=><TableItem key={element.key} Rate={element.Rate} Buy={element.Buy} Sale={element.Sale} CcyNm_UZ={element.CcyNm_UZ} Diff={element.Diff} Ccy={element.Ccy}/>)}
                 </ul>
                </Skeleton>
    </div>
    )
}
export default TableSection