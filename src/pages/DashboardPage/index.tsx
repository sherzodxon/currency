import {useDispatch, useSelector} from "react-redux";
import './index.scss'
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
    LineChart,
    Legend,
    Line
} from "recharts";
import {
    findMinMaxRate,
    getFirstTwoLetters,
    getLast12Months,
    getMonthName,
    roundToLowerHundred,
    roundToUpperHundred
} from "../../functions";
import {useEffect, useState} from "react";
import {useDataCurrency} from "../../contexts/currencyProvider";
import Sort from "../../assets/components/Sort";
import ChevronRight from "../../assets/image/ChevronRight";
import {Button, Result, Skeleton} from "antd";
import FormattedNumber from "../../assets/components/FormattedNumber";
import ArrowUp from "../../assets/image/ArrowUp";
import { changeError } from "../../redux/errorSlice/errorSlice";

interface Chart {
    rate : Number;
    month : String
}
interface Currency {
    key : number;
    Ccy : string;
    CcyNm_UZ : string;
    Rate : number;
    Diff : string

}

const DashboardPage : React.FC = () => {

    const url : any = process.env.REACT_APP_BASE_URL;
    const lastMonths : string[] = getLast12Months();
    const [loading,setLoading] = useState < boolean > (true);
    const theme = useSelector((state : any) => state.theme.theme);
    const {currencies} = useDataCurrency();
    const [defaultChecked,setDefaultChecked] = useState < Currency > ({key: 69, Ccy: "USD", CcyNm_UZ: "AQSh dollari", Rate: 12200, Diff: "12"});
    const [sortOpen,setSortOpen] = useState < boolean > (false)
    const [chartData,setChartData] = useState < Chart[] > ([])
    const {minRate, maxRate} = findMinMaxRate(chartData);
    const error = useSelector((state:any)=>state.error.error);
    const dispatch = useDispatch();
    const dark = theme === "dark";
    const [angleX, setAngleX] = useState<number>(0);
    const [angleY, setAngleY] = useState<number>(0);
    
     const handleResize = () => {
      if (window.innerWidth < 650) {
        setAngleX(-90); 
      } else if (window.innerWidth < 900) {
        setAngleX(-45); 
      } else {
        setAngleX(0); 
      }
    };
    const getCharts = async(code : string = "USD") => {
        const allData : {
            id : number;
            rate : number;
            month : string
        }[] = [];

        try {
            for (let index = 1; index <= lastMonths.length; index++) {
                try {
                    const response = await fetch(`${url}${code}/${lastMonths[index - 1]}/`);

                    if (!response.ok) {
                        console.error(`Fetch error: ${response.status} ${response.statusText}`);
                        continue; 
                    }

                    const data = await response.json();
                    if (!Array.isArray(data)) {
                        console.error("Invalid response format:", data);
                        continue;
                    }

                    const mappedData = data.map((currency : any) => ({
                        id: index,
                        rate: + currency.Rate,
                        month: getMonthName(lastMonths[index - 1])
                    }));

                    allData.push(...mappedData);
                } catch (err) {
                    console.error(`Xatolik ${lastMonths[index - 1]} oyida:`, err);
                    continue;
                }
            }
        } catch (globalErr) {
            console.error(" Umumiy xatolik:", globalErr);
            dispatch(changeError(true))
            return []; 
        }

        return allData;
    };

    async function showData(params : any) {
        setLoading(true);
        const data = await getCharts(params);
        setChartData(data)
        setLoading(false)
    }
    useEffect(() => {
        const usdData = currencies
            ?.find((el : any) => el.Ccy === "USD");
        if (usdData) {
            setDefaultChecked(usdData as Currency)
        }
    }, [currencies]);
    useEffect(()=>{
        handleResize(); 
        window.addEventListener("resize", handleResize);
    },[])
    useEffect(() => {
        showData(defaultChecked.Ccy)
    }, [defaultChecked])
    function diffController(params : string) {
        if (+ params >= 0) {
            return true
        } else 
            return false
    }
    function handleSortOpen() {
        setSortOpen(!sortOpen)
    }
    function handleSortClose() {
        setSortOpen(false)
    }
    const handleOptionChange = (ccy : string) => {
        const findedSortData = currencies.find((element : any) => element.Ccy === ccy);
        setDefaultChecked(findedSortData as Currency);

    }
    
   if (error) {
    return(
    <Result 
                status="404"
                title="404" 
                subTitle="Iltimos! Qaytadan urinib ko'ring."
                className="error-page"
                extra={<Button 
                onClick={()=>window.location.reload()} 
                type="primary">Qayta boshlash</Button>}/>)
   }
    return (
        <div
            className={`${dark
            ? "dashboard dashboard--dark"
            : "dashboard"}`}>
            <div className="dashboard-head">
                <div className="dashboard-rate-wrapper">
                    <Skeleton.Input style={loading? {position: "static"}: {display: "none"}} active={true}/>
                    <p
                        className="dashboard-rate"
                        style={loading? {
                            display: "none"
                        }
                        : {
                            display: "block"
                        }}><FormattedNumber value={defaultChecked.Rate}/>
                       
                    </p>
                     <span  style={loading?{display:"none"}:{display:"block"}}
                            className={`${diffController(defaultChecked.Diff)
                            ? "dashboard-diff dashboard-diff--up"
                            : "dashboard-diff"}`}><ArrowUp
                            className={`${diffController(defaultChecked.Diff)
            ? "arrow-up"
            : "arrow-down"}`}/>{defaultChecked.Diff}</span>
                </div>
                <div className="dashboard-sort-wrapper">
                    <button
                        className={`${dark
                        ? "sort-button sort-button--dark"
                        : "sort-button"} ${sortOpen
                            ? "sort-button--open"
                            : ""}`}
                        onClick={handleSortOpen}>
                        <img
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(defaultChecked.Ccy)}.svg`}
                            alt="flag"
                            width="25"
                            height="25"
                            className="sort-item-img"/> {defaultChecked.Ccy}
                        <span className="sort-button-span"><ChevronRight/></span>
                    </button>
                    <Sort
                        handleOptionChange={handleOptionChange}
                        options={currencies}
                        open={sortOpen}
                        defaultValue={defaultChecked.Ccy}
                        name="dash-sort"
                        close={handleSortClose}/>
                </div>
            </div>
                 <Skeleton loading={loading} active>
                <p className="dashboard-info">{defaultChecked.CcyNm_UZ}ning bir yillik o'zgarishlari grafigi</p>
                 {
                   window.innerWidth>650? <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <AreaChart
                        width={790}
                        height={250}
                        data={chartData}
                        margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 10
                    }}>
                        <defs>
                            <linearGradient id="rate" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="5%"
                                    stopColor={`${dark
                                    ? "rgba(207,207,207,0.5)"
                                    : "#525C6B"}`}
                                    stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="rgba(207,207,207,0.5)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="month"
                            stroke={`${dark
                            ? "#B8C1D7"
                            : "#525C6B"}`}
                            strokeWidth={0} angle={angleX}/>
                        <YAxis
                            domain={[roundToLowerHundred(minRate), roundToUpperHundred(maxRate)]}
                            stroke={`${dark
                            ? "#B8C1D7"
                            : "#525C6B "}`} />
                        <CartesianGrid
                            strokeDasharray="2 2"
                            className="chartGrid"
                            stroke="transparent"/>
                        <Tooltip/>
                        <Area
                            type="bump"
                            dataKey="rate"
                            stroke={`${dark
                            ? "#B5C9FF"
                            : "#11171B"}`}
                            fillOpacity={1}
                            fill="url(#rate)"
                            strokeWidth={3}/>
                    </AreaChart>
                </ResponsiveContainer>:
                <ResponsiveContainer width="100%" height="100%" aspect={1/1}>
                     <LineChart
                        layout="vertical"
                        data={chartData}
                        margin={{
                        top: 20,
                        right: 0,
                        left: 0,
                        bottom: 5,
                        }}
                     >
                          <CartesianGrid strokeDasharray="5 5" stroke="gray"/>
                          <XAxis type="number" domain={[roundToLowerHundred(minRate), roundToUpperHundred(maxRate)]}/>
                          <YAxis dataKey="month" type="category" />
                         <Tooltip />
                         {/* <Legend /> */}
                         <Line dataKey="rate" stroke="#8884d8" />
                        </LineChart>
                 </ResponsiveContainer>
                 }
            </Skeleton>
        </div>
    );
}

export default DashboardPage;