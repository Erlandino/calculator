// Imports
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

// Calculator component
export default function Calculator() {
  // useStates
  const [resultScreen, setResultScreen] = useState([]); /* holds numbers/symbols in result screen */
  const [theme, setTheme] = useState(1); /* holds the current theme */

  // internal css for easy change in css according to theme change
  // whole background
  const websiteBackgroundColor = {
    backgroundColor: `${
      theme === 1 ? "hsl(222, 26%, 31%)" : theme === 2 ? "hsl(0, 0%, 90%)" : "hsl(268, 75%, 9%)"
    }`,
  };
  // calculator result screen
  const calculatorResults = {
    backgroundColor: `${
      theme === 1 ? "hsl(224, 36%, 15%)" : theme === 2 ? "hsl(0, 5%, 81%)" : "hsl(268, 71%, 12%)"
    }`,
    color: `${
      theme === 1 ? "hsl(0, 0%, 100%)" : theme === 2 ? "hsl(60, 10%, 19%)" : "hsl(52, 100%, 62%)"
    }`,
  };
  // calculator inputs
  const calculatorInputsBackgroundColor = {
    backgroundColor: `${
      theme === 1 ? "hsl(223, 31%, 20%)" : theme === 2 ? "hsl(0, 0%, 93%)" : "hsl(268, 71%, 12%)"
    }`,
  };
  // ontop of calculator
  const headerColor = {
    color: `${
      theme === 1 ? "hsl(0, 0%, 100%)" : theme === 2 ? "hsl(60, 10%, 19%)" : "hsl(52, 100%, 62%)"
    }`,
  };

  // adds clicked inputs to array in resultScreen
  // or changes array in resultScreen to house calculated answer
  function addInputToResult(input) {
    // del input
    if (input === "del") {
      setResultScreen((prevResult) => {
        return prevResult.filter((element, index, array) => {
          return index !== prevResult.length - 1;
        });
      });

      // reset input
    } else if (input === "reset") {
      setResultScreen((prevResult) => []);

      // other symbol inputs except =
    } else if (["+", "-", "/", "*", "."].includes(input)) {
      if (resultScreen.length === 0) return;
      else if (
        resultScreen.find(
          (currentValue, index, arr) =>
            index === resultScreen.length - 1 && ["+", "-", "/", "*", "."].includes(currentValue)
        )
      ) {
        return;
      } else setResultScreen((prevResult) => [...prevResult, input === "*" ? "x" : input]);

      // = symbol
    } else if (input === "=") {
      if (["+", "-", "/", "*", "."].includes(resultScreen[resultScreen.length - 1])) {
        return;
      } else setResultScreen((prevResult) => [evalCalc(prevResult)]);

      // all number inputs
    } else setResultScreen((prevResult) => [...prevResult, input]);
  }

  // calculates received array
  const evalCalc = (input) => {
    let changedSignArray = input.map((currentIndex) => {
      return currentIndex === "x" ? "*" : [currentIndex];
    });
    return eval?.(changedSignArray.join(""));
  };

  // controls what inputs are inputtable trough keyobard on screen
  const inputController = (event) => {
    let conditons = /([0-9]|[x/*+-.](?![x/*+-.]))/g;
    let conditonMatch = event.target.value.match(conditons);
    if (["+", "-", "/", "*", ".", "x"].includes(event.nativeEvent.data)) {
      if (
        resultScreen.length === 0 ||
        ["+", "-", "/", "*", ".", "x"].includes(resultScreen[resultScreen.length - 1])
      ) {
        return;
      } else setResultScreen((prevState) => conditonMatch);
    } else setResultScreen((prevState) => conditonMatch);
  };

  // jsx
  return (
    // main background
    <div className="background" style={websiteBackgroundColor}>
      {/* container for calculator */}
      <div className="calculator">
        {/* container for header of calculator */}
        <header className="calculator__header" style={headerColor}>
          {/* title */}
          <p className="calculator__header__title">Calc</p>
          {/* container for theme change */}
          <div className="calculator__header__theme">
            {/* theme change desc */}
            <p className="calculator__header__theme__title">THEME</p>
            {/* slider with number indication*/}
            <div className="calculator__header__theme__decider">
              {/* numbers container */}
              <div className="calculator__header__theme__decider__values">
                {/* number 1 */}
                <input
                  className="calculator__header__theme__decider__values__value"
                  type="button"
                  value={1}
                  style={headerColor}
                  onClick={() => setTheme(1)}
                />
                {/* number 2 */}
                <input
                  className="calculator__header__theme__decider__values__value"
                  type="button"
                  value={2}
                  style={headerColor}
                  onClick={() => setTheme(2)}
                />
                {/* number 3 */}
                <input
                  className="calculator__header__theme__decider__values__value"
                  type="button"
                  value={3}
                  style={headerColor}
                  onClick={() => setTheme(3)}
                />
              </div>
              {/* slider */}
              <Slider
                style={{ padding: "10px", borderRadius: "20px" }}
                min={1}
                max={3}
                handleStyle={[
                  { border: "none", backgroundColor: "hsl(6, 63%, 50%)", marginTop: "0px" },
                ]}
                railStyle={{ backgroundColor: "transparent" }}
                trackStyle={{ backgroundColor: "transparent" }}
                onChange={(event) => setTheme(event)}
                value={theme}
              />
            </div>
          </div>
        </header>
        {/* calculator inputs and results screen container */}
        <main className="calculator__inputs">
          {/* result screen*/}
          <input
            className="calculator__inputs__results"
            style={calculatorResults}
            type="text"
            value={resultScreen ? resultScreen.join("") : ""}
            onChange={(event) => inputController(event)}
            onKeyUp={(event) => {
              if (event.nativeEvent.key === "Enter") addInputToResult("=");
            }}
          />
          {/* calculator inputs container */}
          <div
            className={`calculator__inputs__rows ${"calculator__inputs__rows--theme" + theme}`}
            style={calculatorInputsBackgroundColor}
          >
            {/* row 1 container */}
            <div className="calculator__inputs__rows__row">
              {/* 7 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={7}
                onClick={() => addInputToResult(7)}
              />
              {/* 8 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={8}
                onClick={() => addInputToResult(8)}
              />
              {/* 9 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={9}
                onClick={() => addInputToResult(9)}
              />
              {/* del input (delete) */}
              <input
                className="calculator__inputs__rows__row__input calculator__inputs__rows__row__input--del"
                type="button"
                value={"DEL"}
                onClick={() => addInputToResult("del")}
              />
            </div>
            {/* row 2 container */}
            <div className="calculator__inputs__rows__row">
              {/* 4 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={4}
                onClick={() => addInputToResult(4)}
              />
              {/* 5 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={5}
                onClick={() => addInputToResult(5)}
              />
              {/* 6 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={6}
                onClick={() => addInputToResult(6)}
              />
              {/* + input (addition)*/}
              <input
                className="calculator__inputs__rows__row__input input--symbol"
                type="button"
                value={"+"}
                onClick={() => addInputToResult("+")}
              />
            </div>
            {/* row 3 container */}
            <div className="calculator__inputs__rows__row">
              {/* 1 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={1}
                onClick={() => addInputToResult(1)}
              />
              {/* 2 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={2}
                onClick={() => addInputToResult(2)}
              />
              {/* 3 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={3}
                onClick={() => addInputToResult(3)}
              />
              {/* - input (minus) */}
              <input
                className="calculator__inputs__rows__row__input input--symbol"
                type="button"
                value={"-"}
                onClick={() => addInputToResult("-")}
              />
            </div>
            {/* row 4 container */}
            <div className="calculator__inputs__rows__row">
              {/* . input (comma) */}
              <input
                className="calculator__inputs__rows__row__input input--symbol"
                type="button"
                value={"."}
                onClick={() => addInputToResult(".")}
              />
              {/* 0 input */}
              <input
                className="calculator__inputs__rows__row__input input--number"
                type="button"
                value={0}
                onClick={() => addInputToResult(0)}
              />
              {/* / input (division)*/}
              <input
                className="calculator__inputs__rows__row__input input--symbol"
                type="button"
                value={"/"}
                onClick={() => addInputToResult("/")}
              />
              {/* x or * input (multiplication)*/}
              <input
                className="calculator__inputs__rows__row__input input--symbol"
                type="button"
                value={"x"}
                onClick={() => addInputToResult("*")}
              />
            </div>
            {/* row 5 container */}
            <div className="calculator__inputs__rows__row">
              {/* reset input (deletes content in result screen)*/}
              <input
                className="calculator__inputs__rows__row__input calculator__inputs__rows__row__input--reset"
                type="button"
                value={"RESET"}
                onClick={() => addInputToResult("reset")}
              />
              {/* = input (equal)*/}
              <input
                className="calculator__inputs__rows__row__input calculator__inputs__rows__row__input--equal"
                type="button"
                value={"="}
                onClick={() => addInputToResult("=")}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
