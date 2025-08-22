import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/loadingSlice/loadingSlice";
import { useMediaPredicate } from "react-media-hook";
import { changeTheme } from "../redux/themeSlice/themeSlice";
import { changeError } from "../redux/errorSlice/errorSlice";

interface Currency {
  key: number;
  CcyNm_UZ: string;
  Rate: number;
  Date: string;
  Ccy: string;
  Diff: string;
  Sale: number;
  Buy: number;
}

interface ExchangeRate {
  alpha3: string;
  buy: number;
  rate: number;
  sale: number;
  updated: string;
}

interface DataCurrencyContextValue {
  currencies: Currency[];
  setCurrencies: React.Dispatch<React.SetStateAction<Currency[]>>;
}

export const DataCurrency = createContext<DataCurrencyContextValue | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [saleDate, setSaleDate] = useState<ExchangeRate[]>([]);
  const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)") ? "dark" : "light";
  const url = process.env.REACT_APP_BASE_URL as string;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeTheme(preferredTheme));
  }, [preferredTheme, dispatch]);

  const selectDataRateParam = (data: ExchangeRate[], currencyCode: string) => {
    return data?.find((element) => element.alpha3 === currencyCode);
  };

  useEffect(() => {
    const fetchRates = async () => {
      dispatch(setLoading(true));
      try {
        //  Avval LOCAL API chaqiramiz
        let saleItems: ExchangeRate[] | null = null;

        try {
          const localRes = await fetch(
            "/api/v1/?action=pages&code=uz%2Fperson%2Fexchange_rates"
          );
          if (!localRes.ok) throw new Error("Local fetch failed");
          const localJson = await localRes.json();
          saleItems =
            localJson?.data?.sections?.[0]?.blocks?.[2]?.content?.items ?? null;
        } catch (err) {
          console.warn("Local API ishlamadi, Vercel APIga o'tyapmiz...");
        }

        //  Agar local ishlamasa → VERCEL API
        if (!saleItems) {
          try {
            const vercelRes = await fetch("/api/exchange");
            if (!vercelRes.ok) throw new Error("Vercel fetch failed");
            const vercelJson = await vercelRes.json();
            saleItems =
              vercelJson?.data?.sections?.[0]?.blocks?.[2]?.content?.items ?? null;
          } catch (err) {
            console.error("Vercel API ham ishlamadi");
          }
        }

        //  Agar ikkisi ham ishlamasa → error
        if (!saleItems) {
          dispatch(changeError(true))
          return;
        }

        setSaleDate(saleItems);

        // Currencies chaqiramiz
        const res = await fetch(url);
        if (!res.ok) {
         dispatch(changeError(true))
          return;
        }
        const data = await res.json();

        const mappedCurrencies: Currency[] = data.map((currency: any) => ({
          key: currency.id,
          CcyNm_UZ: currency.CcyNm_UZ,
          Rate: +currency.Rate,
          Date: selectDataRateParam(saleItems!, currency.Ccy)?.updated,
          Ccy: currency.Ccy,
          Diff: currency.Diff,
          Sale: Number(
            selectDataRateParam(saleItems!, currency.Ccy)?.sale || currency.Rate
          ),
          Buy: Number(
            selectDataRateParam(saleItems!, currency.Ccy)?.buy || currency.Rate
          ),
        }));

        setCurrencies(mappedCurrencies);
      } catch (err) {
        dispatch(changeError(true))
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRates();
  }, [url, dispatch]);

  return (
    <DataCurrency.Provider value={{ currencies, setCurrencies }}>
      {children}
    </DataCurrency.Provider>
  );
};

export const useDataCurrency = (): DataCurrencyContextValue => {
  const context = useContext(DataCurrency);
  if (!context) {
    throw new Error("useDataCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export default CurrencyProvider;
