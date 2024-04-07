import React from 'react';
import {Table} from "antd";
import {ColumnsType} from 'antd/es/table';
import {useEffect, useState} from "react";

interface Currency {
    id : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
    key: React.Key;
}
interface Columns { // Define an interface for your data structure
    title : string;
    dataIndex : string;
    key : React.Key;
}

const TableSection : React.FC = () => {

    const [currencies,
        setCurrencies] = useState < Currency[] > ([]);
    const [loading,
        setLoading] = useState < Boolean > (true);
    const [error,
        setError] = useState < Boolean > (false);
    useEffect(() => {
        const fetchCurrencies = async() => {
            try {
                const response = await fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/');
                if (!response.ok) {
                    setError(true)
                }
                const data = await response.json();
                const mappedCurrencies = data.map((currency : any) => ({
                    id: currency.id,
                    CcyNm_UZ: currency.CcyNm_UZ,
                    Rate: currency.Rate,
                    Date: currency.Date,
                    Ccy: currency.Ccy,
                    Diff: currency.Diff

                }))as Currency[];
                setCurrencies(mappedCurrencies);
                setLoading(false)
            } catch (error) {
                console.error('Xatolik yuz berdi:', error);
            }
        };
        fetchCurrencies();
    }, []);

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
            key: 'diff'
        }, {
            title: "Sana",
            dataIndex: 'Date',
            key: 'date'
        }
    ];
    return (
        <div>
            <Table<Currency>
                
                dataSource={currencies}
                columns={columns}
                />
        </div>
    )
}
export default TableSection