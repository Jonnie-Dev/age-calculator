import { useState } from "react";
import "./index.css";
import icon from "./assets/icon-arrow.svg";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newAge, setNewAge] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [isValidDate, setIsValidDate] = useState(null);
  const [isValidMonth, setIsValidMonth] = useState(null);
  const [isValidYear, setIsValidYear] = useState(null);
  const birthDate = `${year}-${month}-${day}`;
  const currentDateObj = new Date();

  function calculateAge(birthDate) {
    const birthDateObj = new Date(birthDate);

    let years = currentDateObj.getFullYear() - birthDateObj.getFullYear();
    let months = currentDateObj.getMonth() - birthDateObj.getMonth();
    let days = currentDateObj.getDate() - birthDateObj.getDate();

    if (days < 0) {
      months--;
      const lastMonthDate = new Date(
        currentDateObj.getFullYear(),
        currentDateObj.getMonth(),
        0
      );
      days += lastMonthDate.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  }

  const handleClick = () => {
    const age = calculateAge(birthDate);

    // Reset all error states before validation
    setIsValid(true);
    setIsValidMonth("");
    setIsValidYear("");
    setIsValidDate("");

    // Check for empty fields
    if (month === "" || year === "" || day === "") {
      setIsValid(false);
      setIsValidMonth(month === "" ? "This field is required" : "");
      setIsValidYear(year === "" ? "This field is required" : "");
      setIsValidDate(day === "" ? "This field is required" : "");
      return;
    }

    // Validate month
    if (+month > 12 || +month < 1) {
      setIsValid(false);
      setIsValidMonth("Must be a valid month");
      return;
    }

    // Validate year
    if (+year > currentDateObj.getFullYear()) {
      setIsValid(false);
      setIsValidYear("Must be in the past");
      return;
    }

    // Validate day based on month
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    const isFebruary = +month === 2;
    const isInvalidDay = isFebruary
      ? isLeapYear(+year)
        ? day > 29
        : day > 28
      : +month === 9 || +month === 4 || +month === 6 || +month === 11
      ? day > 30
      : day > 31;

    if (isInvalidDay) {
      setIsValid(false);
      setIsValidDate("Must be a valid day");
      return;
    }

    // Check if the date is in the future
    if (currentDateObj < new Date(birthDate)) {
      setIsValid(false);
      setIsValidDate("Must be in the past");
      setIsValidMonth("Must be in the past");
      return;
    }

    // All validations passed, set isValid to true and update age
    setIsValid(true);
    setNewAge(age);
  };

  return (
    <main className="flex justify-center items-center">
      <div className="bg-white sm:p-14 m-4 p-4 rounded-[1rem] md:rounded-br-[12.5rem] rounded-br-[5rem]     min-[600px]:max-w-[unset] max-w-xs">
        <h1 className="text-[1.5rem] text-fluid-h mb-8">
          Enter your Date of Birth 🎂
        </h1>
        <div
          className={`flex items-start md:gap-8 gap-4 self-stretch 
        [&>*]:flex [&>*]:gap-2 [&>*]:flex-col [&>*]:items-start
        [&>*>label]:text-[0.7rem] [&>*>label]:text-fluid-label
       ${isValid ? "[&>*>label]:text-smokey-grey" : "[&>*>label]:text-red"}
        [&>*>input]:text-[1rem] [&>*>input]:text-fluid-input [&>*>input]:md:w-[10rem] [&>*>input]:sm:w-[8rem] [&>*>input]:w-[5rem] [&>*>input]:py-3 [&>*>input]:md:px-6 [&>*>input]:px-3
        ${isValid ? "[&>*>input]:border-light-grey" : "[&>*>input]:border-red"}
        [&>*>input]:rounded-lg [&>*>input]:border-[1px] `}
        >
          <div>
            <label className="tracking-[4px]" htmlFor="day">
              DAY
            </label>
            <input
              type="number"
              id="day"
              min={1}
              max={31}
              onChange={(e) => setDay(() => +e.target.value)}
              value={day}
              placeholder="DD"
            />

            {!isValid && (
              <label className=" font-normal italic !text-red">
                {isValidDate}
              </label>
            )}
          </div>
          <div>
            <label className="tracking-[4px]" htmlFor="month">
              MONTH
            </label>
            <input
              type="number"
              id="month"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(() => +e.target.value)}
              placeholder="MM"
            />
            {!isValid && (
              <label className=" font-normal italic !text-red">
                {isValidMonth}
              </label>
            )}
          </div>
          <div>
            <label className="tracking-[4px]" htmlFor="year">
              YEAR
            </label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(() => +e.target.value)}
              placeholder="YYYY"
            />
            {!isValid && (
              <label className=" font-normal italic !text-red">
                {isValidYear}
              </label>
            )}
          </div>
        </div>
        <div
          className="
        before:bg-light-grey before:self-stretch before:block my-16 
        [&>img]:bg-purple before:h-[1px] 
        relative [&>img]:absolute 
        [&>img]:top-[-2.25rem]  [&>img]:sm:right-0 [&>img]:right-[50%]  [&>img]:rounded-full [&>img]:p-4 [&>img]:cursor-pointer"
          onClick={handleClick}
        >
          <img
            className="hover:bg-black translate-x-[50%] sm:translate-x-[0] scale-75 md:scale-100"
            src={icon}
            alt="icon arrow button"
          />
        </div>
        <div className="text-[2.5rem] text-fluid-2 font-[800] italic [&>p>span]:text-purple">
          <p>
            <span>
              {Object.entries(newAge).length !== 0 &&
              isNaN(newAge.years) == false &&
              isValid
                ? newAge.years
                : "--"}
            </span>{" "}
            years
          </p>
          <p>
            <span>
              {Object.entries(newAge).length !== 0 &&
              isNaN(newAge.months) == false &&
              isValid
                ? newAge.months
                : "--"}
            </span>{" "}
            months
          </p>
          <p>
            <span>
              {Object.entries(newAge).length !== 0 &&
              isNaN(newAge.days) == false &&
              isValid
                ? newAge.days
                : "--"}
            </span>{" "}
            days
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
