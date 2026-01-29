import type { ResultData } from "../App";
import { formatter } from "../util/investment";

type ResultProps = {
  annualData: Array<ResultData>;
};

const Result = ({ annualData }: ResultProps) => {
  return (
    <>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investiment Value</th>
            <th>Interest(Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {annualData &&
            annualData.map((data) => (
              <tr key={data.year}>
                <td>{data.year}</td>
                <td>{formatter.format(data.investmentValue)}</td>
                <td>{formatter.format(data.interestOfYear)}</td>
                <td>{formatter.format(data.totalInterest)}</td>
                <td>{formatter.format(data.investedCapital)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Result;
