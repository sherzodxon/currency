// CurrencyConverter.tsx
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getFirstTwoLetters} from "../../functions";
import {useDataCurrency, DataCurrency} from "../../contexts/currencyProvider";
import Sort from "../../assets/components/Sort";
import ChevronRight from "../../assets/image/ChevronRight";
import "./index.scss";

interface Currency {
    Rate : number;
    Ccy : string;
}

const CurrencyConverter : React.FC = () => {
    const {currencies} = useDataCurrency();
    const theme = useSelector((state : any) => state.theme.theme);
    const dark = theme === "dark";

    const [firstCurrency,setFirstCurrency] = useState < Currency > ({Ccy: "USD", Rate: 12200});
    const [secondCurrency,setSecondCurrency] = useState < Currency > ({Ccy: "UZS", Rate: 1});

    const [firstValue,setFirstValue] = useState < number > (1);
    const [secondValue,setSecondValue] = useState < number > (1);

    const [firstOpen,setFirstOpen] = useState < boolean > (false);
    const [secondOpen,setSecondOpen] = useState < boolean > (false);

    const [activeInput,setActiveInput] = useState < "first" | "second" > ("first");

    const firstRef = useRef < HTMLInputElement > (null);
    const secondRef = useRef < HTMLInputElement > (null);
    
    useEffect(()=>{
        const defaultCurrencyRate = currencies.find((el:any)=>el.Ccy == "USD")
       if (defaultCurrencyRate?.Rate) {
        setFirstCurrency({Ccy:"USD",Rate:defaultCurrencyRate.Rate} as Currency)
       }
        
    },[currencies])

    useEffect(() => {
        const convert = () => {
            const rateA = firstCurrency.Rate;
            const rateB = secondCurrency.Rate;

            if (activeInput === "first") {
                const result = (firstValue * rateA) / rateB;
                setSecondValue(parseFloat(result.toFixed(4)));
            } else {
                const result = (secondValue * rateB) / rateA;
                setFirstValue(parseFloat(result.toFixed(4)));
            }
        };

        convert();
    }, [firstCurrency, secondCurrency, firstValue, secondValue, activeInput]);

    
    const renderInputRow = (
        value : number, 
        ref : React.RefObject < HTMLInputElement >, 
        open : boolean, onToggle : () => void, 
        currency : Currency, setCurrency : React.Dispatch < React.SetStateAction < Currency >>, setValue : React.Dispatch < React.SetStateAction < number >>, 
        source : "first" | "second") => 
        {
        const handleChange = (e : React.ChangeEvent < HTMLInputElement >) => {
            setActiveInput(source);
            setValue(+ e.target.value);
        };

        const handleOptionChange = (ccy : string) => {
            const found = currencies.find((c) => c.Ccy === ccy);
            if (found) 
                setCurrency(found);
            };
        
        return (
            <div className="converter-row">
                <input
                    ref={ref}
                    type="number"
                    value={value}
                    onChange={handleChange}
                    className="converter-number-input"
                    min={0}
                    inputMode="decimal"/>
                <div className="converter-sort-wrapper">
                    <button
                        className={`sort-button ${dark? "sort-button--dark": ""} ${open? "sort-button--open":""}`}
                        onClick={onToggle}>
                        <img
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(currency.Ccy)}.svg`}
                            alt="flag"
                            width="25"
                            height="25"
                            className="sort-item-img"/> {currency.Ccy}
                        <span className="sort-button-span">
                            <ChevronRight/>
                        </span>
                    </button>
                    <Sort
                        handleOptionChange={handleOptionChange}
                        options={currencies}
                        open={open}
                        defaultValue={currency.Ccy}
                        name={`sort-${source}`}
                        close={() => (ref === firstRef? setFirstOpen(false): setSecondOpen(false))}/>
                </div>
            </div>
        );
    };

    return (
        <div
            className={`converter ${dark? "converter--dark": "converter--light"}`}>
            <h2 className="converter-title">Bank valyuta konvertori</h2>
            <div className="converter-wrapper">
                {renderInputRow(firstValue, firstRef, firstOpen, () => setFirstOpen(!firstOpen), firstCurrency, setFirstCurrency, setFirstValue, "first")}

                {renderInputRow(secondValue, secondRef, secondOpen, () => setSecondOpen(!secondOpen), secondCurrency, setSecondCurrency, setSecondValue, "second")}

            </div>
        </div>
    );
};

export default CurrencyConverter;
