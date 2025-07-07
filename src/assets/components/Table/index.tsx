import React, {useRef} from 'react';
import {
    Button,
    DatePicker,
    Form,
    Input,
    InputRef,
    Result,
    Skeleton,
    Table,
    Tag
} from "antd";
import {FiSearch} from "react-icons/fi";
import {ColumnsType} from 'antd/es/table';
import {useEffect, useState} from "react";
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import './index.scss'
import { useSelector } from 'react-redux';
import {useDataCurrency } from '../../../contexts/currencyProvider';
import { getFirstTwoLetters } from '../../../functions';


interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
}

const TableSection : React.FC = () => {
    const [data,setData] = useState < Currency[] > ([]);
    const {currencies,setCurrencies} = useDataCurrency();
    const isLoading = useSelector((state:any)=>state.isLoading.loading);
    const theme= useSelector((state:any)=>state.theme.theme)
    const [searchData,setSearchData] = useState < Currency[] > ([]);
    const [searchValue,setSearchValue] = useState < String > ("")
    const [error,setError] = useState < Boolean > (false);
    const searchRef = useRef < InputRef > (null);
    const url : any = process.env.REACT_APP_BASE_URL;
   
    function diffColorChanger(params : number) {
        if (params > 0) {
            return "red"

        } else if (params === 0) {
            return "cyan"
        } else 
            return "green"
    }
    function diffIconChanger(params : number) {
        if (params > 0) {
            return false
        } else 
            return true
    }


    useEffect(() => {
        if (searchData.length) {
            setData(searchData)
        } else 
            setData(currencies)
          

    }, [currencies, searchValue]);

    function handleSearchInput() {
        if (searchRef.current) {
            const searchValue : any = searchRef.current.input
                ?.value
            setSearchValue(searchValue)
            const foundData = currencies.filter((el) => {

                const searchRegExp = new RegExp(searchValue, "gi");
                const searchText = `${el.CcyNm_UZ}`;
                return searchText.match(searchRegExp);

            })
            setSearchData(foundData);
        }
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
            <Skeleton loading={isLoading} active>
                <div className="table-head">
                    <Input
                        type='text' 
                        onChange={handleSearchInput}
                        ref={searchRef}
                        style={{
                        width: "30rem", 
                        // outlineColor:"#0E1418",
                        borderRadius:"100px"
                        
                    }}  
                        className={theme=="dark"?"table-search-input table-search-input--dark":" table-search-input table-search-input--light"}
                        size="large"
                        
                        placeholder="Qidirish"
                        prefix={< FiSearch color = '#838383' style = {{width:"2rem", height:"2rem"}}/>}/>
                    
                </div>
                 
                </Skeleton>

            </div>
    )
}
export default TableSection