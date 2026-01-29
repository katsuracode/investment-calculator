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
    currentAnnualData.forEach((annualData, index) => {
      const investmentValue = annualData.valueEndOfYear;
      const interestOfYear = annualData.interest;

      const totalInterest =
        interestOfYear + (index === 0 ? 0 : currentAnnualData[index].interest);

      const investedCapital = investmentValue - totalInterest;
      convertData.push({
        year: annualData.year,
        investmentValue,
        interestOfYear,
        totalInterest,
        investedCapital,
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
