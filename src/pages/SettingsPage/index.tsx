import {Button, DatePicker, Form, Input} from "antd";
import {useSelector} from "react-redux";
import {convertToDDMMYY} from "../../functions";
import {useEffect, useState} from "react";
import HistoryTable from "../../assets/components/HistoryTable";

interface Currency {
    key : number;
    CcyNm_UZ : string;
    Rate : number;
    Date : string;
    Ccy : string;
    Diff : string;
}
interface HistoryItem {
    date : string;
    data : Currency[];
}
type SettingsPageProps = {}

const SettingsPage : React.FC < SettingsPageProps > = () => {
    const theme = useSelector((state : any) => state.theme.theme);

    const url : any = process.env.REACT_APP_BASE_URL;
    type FieldType = {
        code?: string;
        date?: string;
    };
    const historyDataString = JSON.parse(localStorage.getItem('history') || '[]');

    const [historyData,
        setHistoryData] = useState < HistoryItem[] > (historyDataString);

    const onFinish = async(values : any) => {
        try {
            const response = values.code
                ? await fetch(`${url}${values.code}/${convertToDDMMYY(values.date)}/`)
                : await fetch(`${url}all/${convertToDDMMYY(values.date)}/`);
            if (!response.ok) {
                //console.log(error);

            }
            // setLoading(true)
            const data = await response.json();
            const historyCurrency = data.map((currency : any) => ({
                key: currency.id,
                CcyNm_UZ: currency.CcyNm_UZ,
                Rate: currency.Rate,
                Date: currency.Date,
                Ccy: currency.Ccy,
                Diff: currency.Diff

            }))as Currency[];

            // setLoading(false)

            const history : HistoryItem = {
                date: convertToDDMMYY(values.date),
                data: historyCurrency
            }
            setHistoryData((prevHistoryData) => [
                ...prevHistoryData,
                history
            ]);

        } catch (error) {
            //setError(true)
        }
    };
    useEffect(() => {
        localStorage.setItem('history', JSON.stringify(historyData || []))
    }, [historyData])
   
    return (
        <div>
            <Form onFinish={onFinish} className="table-history-wrapper">
                <Form.Item<FieldType>
                    name="code">
                    <Input
                        className={theme == "dark"
                        ? "table-form-code table-search-input--dark"
                        : "table-form-code table-search-input--light"}
                        size="large"
                        style={{
                        textTransform: 'uppercase'
                    }}
                        type='text'
                        placeholder='USD'
                        maxLength={3}/>
                </Form.Item>
                <Form.Item<FieldType>
                    name="date" rules={[{
                            required: true,
                            message: 'Iltimos vaqtni kiriting!'
                        }
                    ]}>
                    <DatePicker
                        className={theme == "dark"
                        ? "table-form-date table-search-input--dark"
                        : "table-form-date table-search-input--light"}
                        placeholder='Sana'
                        size='large'/>
                </Form.Item>
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
            <HistoryTable data={historyData}/>
        </div>
    )
}
export default SettingsPage