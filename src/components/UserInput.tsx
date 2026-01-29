import React, { useState } from "react";
import { calculateInvestmentResults } from "../util/investment";
import type { InvestmentData } from "../App";

type UserInputProps = {
  onAnnualDataUpdate: (annualData: Array<InvestmentData>) => void;
};

const UserInput = ({ onAnnualDataUpdate }: UserInputProps) => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualInvestment, setAnnualInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");
  const [isValid, setIsValid] = useState(true);

  function updateAnnualData() {
    const initial = parseFloat(initialInvestment) || 0;
    const annual = parseFloat(annualInvestment) || 0;
    const expected = parseFloat(expectedReturn) || 0;
    const dur = parseInt(duration) || 0;

    // 期間だけは正の数である必要がある
    if (dur > 0) {
      const annualData = calculateInvestmentResults({
        initialInvestment: initial,
        annualInvestment: annual,
        expectedReturn: expected,
        duration: dur,
      });

      onAnnualDataUpdate(annualData);
    } else {
      onAnnualDataUpdate([]);
    }
  }

  function handleKeyDownAndUpdate(
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Enter") {
      updateAnnualData();
    }
  }

  function handleInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      switch (event.target.name) {
        case "initial_investment":
          setInitialInvestment(value);
          break;
        case "annual_investment":
          setAnnualInvestment(value);
          break;
        case "expected_return":
          setExpectedReturn(value);
          break;
        case "duration":
          setDuration(value);
          break;
      }
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  return (
    <>
      <section id="user-input">
        <div className="input-group">
          <p>
            <label htmlFor="initial_investment">initial investment</label>
            <input
              type="text"
              name="initial_investment"
              id="initial_investment"
              value={initialInvestment}
              onChange={handleInputValue}
              onBlur={updateAnnualData}
              onKeyDown={handleKeyDownAndUpdate}
              required
            />
          </p>
          <p>
            <label htmlFor="annual_investment">annual investment</label>
            <input
              type="text"
              name="annual_investment"
              id="annual_investment"
              value={annualInvestment}
              onChange={handleInputValue}
              onBlur={updateAnnualData}
              onKeyDown={handleKeyDownAndUpdate}
              required
            />
          </p>
        </div>

        <div className="input-group">
          <p>
            <label htmlFor="expected_return">expected return</label>
            <input
              type="text"
              name="expected_return"
              id="expected_return"
              value={expectedReturn}
              onChange={handleInputValue}
              onBlur={updateAnnualData}
              onKeyDown={handleKeyDownAndUpdate}
              required
            />
          </p>
          <p>
            <label htmlFor="duration">duration</label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={duration}
              onChange={handleInputValue}
              onBlur={updateAnnualData}
              onKeyDown={handleKeyDownAndUpdate}
              required
            />
          </p>
        </div>
        <p className="center">
          {!isValid && <div className="center">Please enter valid value</div>}
        </p>
      </section>
    </>
  );
};

export default UserInput;
