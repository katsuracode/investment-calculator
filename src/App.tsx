import { useState } from "react";
import Header from "./components/Header";
import Result from "./components/Result";
import UserInput from "./components/UserInput";

export type InventimentData = {
  year: number;
  interest: number;
  valueEndOfYear: number;
  annualInvestment: number;
};

export type ResultData = {
  year: number;
  investmentValue: number;
  interestOfYear: number;
  totalInterest: number;
  investedCapital: number;
};

const App = () => {
  const [annualData, setAnnualData] = useState<Array<InventimentData>>([]);
  const [resultData, setResultData] = useState<Array<ResultData>>([]);

  function handleAnnualData(currentAnnualData: Array<InventimentData>) {
    setAnnualData(currentAnnualData);

    const convertData: Array<ResultData> = [];
    let totalInterestAccumulated = 0;
    let totalInvestedCapital = 0;

    currentAnnualData.forEach((annualData, index) => {
      const investmentValue = annualData.valueEndOfYear;
      const interestOfYear = annualData.interest;

      totalInterestAccumulated += interestOfYear;

      if (index === 0) {
        totalInvestedCapital = investmentValue - interestOfYear;
      } else {
        totalInvestedCapital += annualData.annualInvestment;
      }

      convertData.push({
        year: annualData.year,
        investmentValue,
        interestOfYear,
        totalInterest: totalInterestAccumulated,
        investedCapital: totalInvestedCapital,
      });
    });

    setResultData(convertData);
  }

  return (
    <>
      <Header />
      <UserInput onAnnualDataUpdate={handleAnnualData} />

      <Result annualData={resultData} />
    </>
  );
};

export default App;
