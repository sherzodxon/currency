import {Button, Form, Input, Select} from "antd";
import {DataCurrency, useDataCurrency} from "../../contexts/currencyProvider";
import {useEffect, useState} from "react";
import {getFirstTwoLetters} from "../../functions";
import {useSelector} from "react-redux";
import './index.scss'

type TransactionPageProps = {}
interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
}
interface CurrencyOption {
    value : string;
    label : JSX.Element;
}
const TransactionPage : React.FC < TransactionPageProps > = () => {
    const {currencies} = useDataCurrency();
    const theme = useSelector((state : any) => state.theme.theme);
    const [value,
        setValue] = useState < CurrencyOption[] > ([]);
    useEffect(() => {
        setValue(currencies.map((el : any) => ({value: el.Ccy, label: (
                <div className="transaction-option-wrapper">
                    <img
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${getFirstTwoLetters(el.Ccy)}.svg`}
                        className='transaction-option-flag' width={20} height={20}/>
                    <p className='option-item'>{el.Ccy}</p>
                </div>
            )})))
    }, [currencies])
    //  const usdData = currencies.find(el=>el.Ccy == "USD") const first =
    // usdData?.Rate?usdData.Rate:0; const second = eurData?.Rate?eurData.Rate:0;
    // const result = first / second console.log(result);

    const onChange = (value : string) => {
        const findedData = currencies.find((el) => el.Ccy == value);
        console.log(findedData);
    };
    const onFinish = (values : any) => {
        console.log(values);

    }

    return (
        <div>
            <Form onFinish={onFinish}>
                <div className="transaction-input-row">
                     <Form.Item name="firstValue">
                    <Input type="number" size="large"  className={theme == "dark"
                        ? "transaction-code table-search-input--dark"
                        : "transaction-code table-search-input--light"} placeholder="0"/>
                </Form.Item>
                <Form.Item name="firstCurrency" >
                    <Select
                        onChange={onChange}
                        options={value}
                        // colorBgContainer={theme=='dark'?"#000":"#fff"}
                       placeholder={( <img
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg`}
                        className='transaction-option-flag' width={20} height={20}/>)}
                        style={{
                            borderRadius:"100px",
                        textTransform: 'uppercase'
                    }}/>
                </Form.Item>
                </div>
                <Form.Item>
                    <Button
                        size='large'
                        className='table-form-button'
                        type="primary"
                        style={{
                        borderRadius: "100px"
                    }}
                        htmlType="submit">Yuborish
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default TransactionPage;