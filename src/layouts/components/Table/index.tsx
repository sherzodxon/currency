import React, { useRef } from 'react';
import {Button, Form, Input, InputRef, Result, Skeleton, Table,Tag} from "antd";
import { FiSearch } from "react-icons/fi";
import {ColumnsType} from 'antd/es/table';
import {useEffect, useState} from "react";
import {ArrowUpOutlined,ArrowDownOutlined} from '@ant-design/icons';
import './index.scss'

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
    const [currencies,setCurrencies] = useState < Currency[] > ([]);
    const [isLoading,setLoading] = useState (true);
    const [searchData,setSearchData]=useState<Currency[]>([]);
    const [searchValue,setSearchValue]=useState<String>("")
    const [error,setError] = useState < Boolean > (false);
    const searchRef = useRef<InputRef>(null);
    const url:any = process.env.REACT_APP_BASE_URL;
    type FieldType = {
        code?: string;
        date?: string;
      };
    function diffColorChanger(params:number) {
        if (params>0) {
            return "red"
            
        }
        else if (params === 0) {
            return "cyan"
        }
        else
        return "green"
    }
    function diffIconChanger(params:number) {
        if (params>0) {
            return false
        }
        else return true
    }
    useEffect(() => {
        const fetchCurrencies = async() => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    setError(true)
                }
                const data = await response.json();
                const mappedCurrencies = data.map((currency : any) => ({
                    key: currency.id,
                    CcyNm_UZ: currency.CcyNm_UZ,
                    Rate: currency.Rate,
                    Date: currency.Date,
                    Ccy: currency.Ccy,
                    Diff: currency.Diff

                }))as Currency[];
                setCurrencies(mappedCurrencies);
                setLoading(false)
            } catch (error) {
               setError(true)
            }
        };
        fetchCurrencies();
    }, []);
    useEffect(()=>{
       if (searchData.length) {
        setData(searchData)
       }
       else setData(currencies)
    },[currencies,searchValue])
    function handleSearchInput() {
        if (searchRef.current) {
            const searchValue:any = searchRef.current.input?.value
            setSearchValue(searchValue)
            const foundData = currencies.filter((el) => {
                
                const searchRegExp = new RegExp(searchValue, "gi");
                const searchText = `${el.CcyNm_UZ}`;
                return searchText.match(searchRegExp);
    
            })  
            setSearchData(foundData)
           }
    }
    const columns : ColumnsType < Currency > = [
        {
            title: 'Nomi',
            dataIndex: 'CcyNm_UZ',
            key: 'name',
            sorter: (a, b) => a.CcyNm_UZ.length - b.CcyNm_UZ.length,
        }, {
            title: 'Kodi',
            dataIndex: 'Ccy',
            key: 'code'
        }, {
            title: "Kursi",
            dataIndex: 'Rate',
            key: 'rate',
            sorter: (a, b) => a.Rate - b.Rate,
        }, {
            title: "O'zgarishi",
            dataIndex: 'Diff',
            key: 'diff',
            render:(diff)=>(
              <Tag bordered={false} icon={diffIconChanger(-diff)?<ArrowUpOutlined/>:<ArrowDownOutlined/>} color={diffColorChanger(-diff)}>{diff}</Tag>
            )
        }, {
            title: "Sana",
            dataIndex: 'Date',
            key: 'date'
        }
    ];
    if (error) {
        return(
            <Result
            status="404"
            title="403"
            subTitle="Iltimos! Qaytadan urinib ko'ring."
            extra={<Button onClick={()=>window.location.reload()} type="primary">Qayta boshlash</Button>}
             />
        )
    }
    else
    return (
        <div>
            <Skeleton loading={isLoading} active>
                <div className="table-head">   
                <Input type='text' onChange={handleSearchInput} ref={searchRef} style={{width:"30rem"}} size="large" color='red' placeholder="Qidirish" prefix={<FiSearch color='gray' style={{width:"2rem", height:"2rem"}} />} />
                <Form className="table-history-wrapper">
                    <Form.Item<FieldType>  name="code"  rules={[{ required: true, message: 'Iltimos kodni kiriting!' }]}>
                    <Input size="large" style={{textTransform:'uppercase',width:"60px"}} type='text' placeholder='USD' maxLength={3} pattern="[A-Z]{3}" />
                    </Form.Item>
                    <Form.Item<FieldType>  name="date"  rules={[{ required: true, message: 'Iltimos vaqtni kiriting!' }]}>
                    <Input size='large' type='date' style={{maxWidth:"15rem"}}/>
                    </Form.Item>
                    
                    <Form.Item>
                    <Button size='large' type="primary" htmlType="submit">Yuborish
                   </Button>
    </Form.Item>
                </Form>
                </div>
            <Table<Currency>
                dataSource={data}
                columns={columns}
                />
            </Skeleton>
           
        </div>
    )
}
export default TableSection