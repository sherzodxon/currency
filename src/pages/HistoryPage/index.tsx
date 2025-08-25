import {useDispatch, useSelector} from "react-redux";
import {convertToYYYYMMDD, getFirstTwoLetters} from "../../functions";
import {useEffect, useState} from "react";
import {useDataCurrency} from "../../contexts/currencyProvider";
import Sort from "../../assets/components/Sort";
import ChevronRight from "../../assets/image/ChevronRight";
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import './index.scss';
import {CustomLocale} from 'flatpickr/dist/types/locale';
import HistoryTable from "../../assets/components/HistoryTable";
import { changeError } from "../../redux/errorSlice/errorSlice";
import { Button, Result } from "antd";

const Uzbek : CustomLocale = {
    weekdays: {
        shorthand: [
            'Yak',
            'Du',
            'Se',
            'Ch',
            'Pa',
            'Ju',
            'Sh'
        ],
        longhand: [
            'Yakshanba',
            'Dushanba',
            'Seshanba',
            'Chorshanba',
            'Payshanba',
            'Juma',
            'Shanba'
        ]
    },

    months: {
        shorthand: [
            'Yan',
            'Fev',
            'Mar',
            'Apr',
            'May',
            'Iyn',
            'Iyl',
            'Avg',
            'Sen',
            'Okt',
            'Noy',
            'Dek'
        ],
        longhand: [
            'Yanvar',
            'Fevral',
            'Mart',
            'Aprel',
            'May',
            'Iyun',
            'Iyul',
            'Avgust',
            'Sentabr',
            'Oktabr',
            'Noyabr',
            'Dekabr'
        ]
    },

    firstDayOfWeek: 1,
    rangeSeparator: ' dan ',
    weekAbbreviation: 'Hafta',
    scrollTitle: 'Kattalashtirish uchun aylantiring',
    toggleTitle: 'Ochish / Yopish',
    time_24hr: true
};

interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
}
interface HistoryItem {
    id:number;
    date : string ;
    data : Currency[];
}
type HistoryPageProps = {}

const HistoryPage : React.FC < HistoryPageProps > = () => {
    const theme = useSelector((state : any) => state.theme.theme);
    const dark = theme === "dark";
    const url = process.env.REACT_APP_BASE_URL as string;
    const [code,setCode] = useState < string > ("USD");
    const [date,setDate] = useState < Date []> ([]);
    const [sortOpen,setSortOpen] = useState < boolean > (false);
    const [sortDisabled,setSortDisabled] = useState < boolean > (false);
    const [buttonDisabled,setButtonDisabled] = useState <boolean>(true)
    const [isLoading,setLoading] = useState < boolean > (false);
    const {currencies} = useDataCurrency();
    const historyDataString = JSON.parse(localStorage.getItem('history') || '[]');
    const [historyData,setHistoryData] = useState < HistoryItem[] > (historyDataString);
    const error = useSelector((state:any)=>state.error.error);
    const [dropOpen , setDropOpen] =useState<boolean>(false);
    const dispatch = useDispatch();
    function handleSortOpen() {
        setSortOpen(!sortOpen)
    }
    function handleSortClose() {
        setSortOpen(false)
    }
    const handleOptionChange = (ccy : string) => {
        const findedSortData = currencies.find((element : any) => element.Ccy === ccy);
        if (findedSortData) {
            setCode(findedSortData.Ccy)
        }
    }
    const handleDisableChecked = (evt : any) => {
        const value = evt.target.checked
        setSortDisabled(value);
        if (sortOpen && value) {
            setSortOpen(false)
        }
    }
    const onFinish = async() => {
        try {
            const response = sortDisabled
                ? await fetch(`${url}all/${convertToYYYYMMDD(date)}/`)
                : await fetch(`${url}${code}/${convertToYYYYMMDD(date)}/`);
                
            if (!response.ok) {
                console.log("error");
                
            }
            setLoading(true)
            const data = await response.json();
            const historyCurrency = data.map((currency : any) => ({
                key: currency.id,
                CcyNm_UZ: currency.CcyNm_UZ,
                Rate: currency.Rate,
                Date: currency.Date,
                Ccy: currency.Ccy,
                Diff: currency.Diff

            }))as Currency[];

            setLoading(false)
             
            const history : HistoryItem = {
                id:Math.round(Math.random()*1000),
                date: date.toLocaleString().split(',')[0],
                data: historyCurrency
            }
            setHistoryData((prevHistoryData) => [...prevHistoryData,     history ]);
          
        } catch (error) {
           dispatch(changeError(true))
        }
    };
    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(historyData || []))
    }, [historyData])
    function handleDateChange(params:Date[]) {
        setDate(params)
        setButtonDisabled(false)
    }
    if (error) {
        return(<Result 
                status="404"
                title="404" 
                subTitle="Iltimos! Qaytadan urinib ko'ring."
                className="error-page"
                extra={<Button 
                onClick={()=>window.location.reload()} 
                type="primary">Qayta boshlash</Button>}/>)
    }
    return (
        <div className={`history ${dark?"history--dark":""}`}>
            <div className="history-head">
                <button className="history-drop-button" onClick={()=>setDropOpen(!dropOpen)}>+</button>
                <div className="history-drop" style={dropOpen?{display:"flex"}:{display:"none"}}>
                    <div className="history-checkbox-wrapper">
                    <input
                        className="visually-hidden"
                        type="checkbox"
                        onChange={handleDisableChecked}
                        name="check"
                        id="allSelector"/>
                    <label
                        className={`history-label ${dark
                        ? "history-label--dark"
                        : ""}`}htmlFor="allSelector">
                        <span className="history-label-text">Barcha valyutalar</span>
                        <span className="history-label-tick">
                            <span className="history-all-selected"></span>
                        </span>
                    </label>

                </div>
                <div className="history-sort-wrapper">
                    <button
                        className={`${dark
                        ? "sort-button sort-button--dark"
                        : "sort-button"} ${sortOpen
                            ? "sort-button--open"
                            : ""}`}
                        onClick={handleSortOpen}
                        disabled={sortDisabled}>
                        <img
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(code)}.svg`}
                            alt="flag"
                            width="25"
                            height="25"
                            className="sort-item-img"/> {code}
                        <span className="sort-button-span"><ChevronRight/></span>
                    </button>
                    <Sort
                        handleOptionChange={handleOptionChange}
                        options={currencies}
                        open={sortOpen}
                        defaultValue={"USD"}
                        name="history-sort"
                        close={handleSortClose}/>
                </div>
                <div className="history-date-wrapper">
                    <Flatpickr
                        className={`history-date ${dark
                        ? "history-date--dark"
                        : ""}`}
                        placeholder="Sana"
                        value={convertToYYYYMMDD(date)}
                        onChange={handleDateChange}
                        options={{
                        locale: Uzbek,
                        dateFormat: "Y-m-d",
                        maxDate: "today"
                    }}/>
                </div>
                <button
                    disabled={buttonDisabled}
                    onClick={onFinish}
                    className={`history-button ${isLoading
                    ? "history-button--loading"
                    : ""}`}>
                    <span className="history-button-text">Qabul qilish</span>
                    <span className="history-loader"></span>
                </button>
                </div>
            </div>
            <HistoryTable data={historyData}/>
        </div>

    )
}
export default HistoryPage