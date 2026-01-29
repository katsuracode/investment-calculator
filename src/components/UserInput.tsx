import React, { useState } from "react";
import { calculateInvestmentResults } from "../util/investment";
import type { InventimentData } from "../App";

type UserInputProps = {
  onAnnualDataUpdate: (annualData: Array<InventimentData>) => void;
};

const UserInput = ({ onAnnualDataUpdate }: UserInputProps) => {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualInvestment, setAnnualInvestment] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  const [duration, setDuration] = useState("");

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

  function handleInputInitialInvestment(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const initialInvestmentValue = event.target.value || "0";
    setInitialInvestment(initialInvestmentValue);
  }

  function handleInputAnnualInvestment(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const annualInvestmentValue = event.target.value || "0";
    setAnnualInvestment(annualInvestmentValue);
  }

  function handleInputExpectedReturn(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const expectedReturnValue = event.target.value;
    setExpectedReturn(expectedReturnValue);
  }

  function handleInputDuration(event: React.ChangeEvent<HTMLInputElement>) {
    const durationValue = event.target.value;
    setDuration(durationValue);
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
              onChange={handleInputInitialInvestment}
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
              onChange={handleInputAnnualInvestment}
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
              onChange={handleInputExpectedReturn}
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
              onChange={handleInputDuration}
              onBlur={updateAnnualData}
              onKeyDown={handleKeyDownAndUpdate}
              required
            />
          </p>
        </div>
      </section>
    </>
  );
};

export default UserInput;
