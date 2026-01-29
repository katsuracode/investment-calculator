import React, { useState } from "react";
import { calculateInvestmentResults } from "../util/investment";
import type { InventimentData } from "../App";

type UserInputProps = {
  onAnnualDataUpdate: (annualData: Array<InventimentData>) => void;
};

const UserInput = ({ onAnnualDataUpdate }: UserInputProps) => {
  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualInvestment, setAnnualInvestment] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState(0);

  function updateAnnualData() {
    if (
      initialInvestment &&
      initialInvestment > 0 &&
      annualInvestment &&
      annualInvestment > 0 &&
      expectedReturn &&
      parseFloat(expectedReturn) > 0 &&
      duration &&
      duration > 0
    ) {
      const expectedReturnFloat = parseFloat(expectedReturn);

      const annualData = calculateInvestmentResults({
        initialInvestment,
        annualInvestment,
        expectedReturn: expectedReturnFloat,
        duration,
      });

      onAnnualDataUpdate(annualData);
      console.table(annualData);
    } else {
      console.group();
      console.log("initialInvestment = ", initialInvestment);
      console.log("annualInvestment = ", annualInvestment);
      console.log("expectedReturn = ", expectedReturn);
      console.log("duration = ", duration);
      console.groupEnd();
    }
  }

  function handleInputInitialInvestment(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const initialInvestmentValue = parseInt(event.target.value) || 0;
    setInitialInvestment(initialInvestmentValue);
    updateAnnualData();
  }

  function handleInputAnnualInvestment(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const annualInvestmentValue = parseInt(event.target.value) || 0;
    setAnnualInvestment(annualInvestmentValue);
    updateAnnualData();
  }

  function handleInputExpectedReturn(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const expectedReturnValue = event.target.value;
    setExpectedReturn(expectedReturnValue);
    updateAnnualData();
  }

  function handleInputDuration(event: React.ChangeEvent<HTMLInputElement>) {
    const durationValue = parseInt(event.target.value);
    setDuration(durationValue);
    updateAnnualData();
  }

  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <div>
            <label htmlFor="initial_investment">initial investiment</label>
            <input
              type="text"
              name="initial_investment"
              id="initial_investment"
              value={initialInvestment}
              onChange={handleInputInitialInvestment}
            />
          </div>
          <div>
            <label htmlFor="annual_investment">annual investiment</label>
            <input
              type="text"
              name="annual_investment"
              id="annual_investment"
              value={annualInvestment}
              onChange={handleInputAnnualInvestment}
            />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label htmlFor="expected_return">expected return</label>
            <input
              type="text"
              name="expected_return"
              id="expected_return"
              value={expectedReturn}
              onChange={handleInputExpectedReturn}
            />
          </div>

          <div>
            <label htmlFor="duration">duration</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={duration}
              onChange={handleInputDuration}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInput;
