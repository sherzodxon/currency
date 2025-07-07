import React, {createContext, useContext, useState, ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setLoading} from '../redux/loadingSlice/loadingSlice';
import {getMonthName} from '../functions';
import {useMediaPredicate} from 'react-media-hook';
import {changeTheme} from '../redux/themeSlice/themeSlice';

interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
    Sale:number;
    Buy:number;
}
interface ExchangeRate {
    alpha3 : string;
    buy : number;
    rate : number;
    sale : number;
    updated : string
}

interface DataCurrencyContextValue {
    currencies : Currency[];
    setCurrencies : React.Dispatch < React.SetStateAction < Currency[] >>;
}
export const DataCurrency = createContext < DataCurrencyContextValue | undefined > (undefined);

interface CurrencyProviderProps {
    children : ReactNode;
}

const CurrencyProvider : React.FC < CurrencyProviderProps > = ({children}) => {
    const [currencies,
        setCurrencies] = useState < Currency[] > ([]);
    const [saleDate,
        setSaleDate] = useState < ExchangeRate[] > ([]);
    const preferredTheme = useMediaPredicate("(prefers-color-scheme:dark)")
        ? "dark"
        : "light";

    const [error,
        setError] = useState < Boolean > (false);
    const url : any = process.env.REACT_APP_BASE_URL;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeTheme(preferredTheme))
    }, [preferredTheme]);

    useEffect(() => {
        const fetchRates = async() => {
            try {
                const response = await fetch('/api/v1/?action=pages&code=uz%2Fperson%2Fexchange_rates');

                if (!response.ok) {
                    setError(true)
                }
                const data = await response.json();
                setSaleDate(data.data
                    ?.sections[0]
                        ?.blocks[2]
                            ?.content
                                ?.items);

            } catch (error) {
                setError(true)
            }
        }
        fetchRates();
    }, [])
    useEffect(() => {
        const fetchCurrencies = async() => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    setError(true)
                }
                else if(saleDate.length){
                  const data = await response.json();
                const mappedCurrencies = data.map((currency : any) => ({
                    key: currency.id,
                    CcyNm_UZ: currency.CcyNm_UZ,
                    Rate: currency.Rate,
                    Date: currency.Date,
                    Ccy: currency.Ccy,
                    Diff: currency.Diff,
                    Sale:saleDate?.find((element:any)=>element.alpha3==currency.Ccy)?.sale,
                    Buy:saleDate?.find((element:any)=>element.alpha3==currency.Ccy)?.buy,

                }))as Currency[];
                setCurrencies(mappedCurrencies)
                console.log(currencies);
                dispatch(setLoading(false))
                }
            } catch (error) {
                setError(true)
            }

            const getcharts = async(code : string = "USD") => {
                const allData : any[] = [];
                for (let index = 1; index <= 12; index++) {
                    const response = await fetch(`${url}${code}/2024-${index}-01/`);
                    const data = await response.json();
                    const mappedData = data.map((currency : any) => ({
                        rate :+ currency.Rate,
                        month: getMonthName(index)
                    }))
                    allData.push(...mappedData)
                }
                //  dispatch(setCurrency(allData))
            }
            //getcharts();
        };

        fetchCurrencies();
    }, [saleDate])

    return (
        <DataCurrency.Provider
            value={{
            currencies,
            setCurrencies
        }}>
            {children}
        </DataCurrency.Provider>
    );
};

export const useDataCurrency = () : DataCurrencyContextValue => {
    const context = useContext(DataCurrency);
    if (!context) {
        throw new Error('useDataCurrency must be used within a CurrencyProvider');
    }
    return context;
};

export default CurrencyProvider;
