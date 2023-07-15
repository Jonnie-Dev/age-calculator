import { useState } from "react";
import "./index.css";
import icon from "./assets/icon-arrow.svg";

function App() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [newAge, setNewAge] = useState({});
  const birthDate = `${year}-${month}-${day}`;

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function calculateAge(birthDate) {
    const birthDateObj = new Date(birthDate);
    const currentDateObj = new Date();

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

    const birthYear = birthDateObj.getFullYear();
    const birthMonth = birthDateObj.getMonth() + 1;
    const birthDay = birthDateObj.getDate();

    // Adjust for leap years
    for (let year = birthYear; year < currentDateObj.getFullYear(); year++) {
      if (isLeapYear(year)) {
        days++;
      }
    }

    if (
      isLeapYear(currentDateObj.getFullYear()) &&
      birthMonth <= 2 &&
      currentDateObj.getMonth() >= 2
    ) {
      days++;
    }

    return { years, months, days };
  }

  const handleClick = () => {
    const age = calculateAge(birthDate);
    age.years < 200 && setNewAge(age);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white sm:p-14 m-4 p-4 rounded-[1rem] md:rounded-br-[12.5rem] rounded-br-[5rem]     min-[600px]:max-w-[unset] max-w-xs">
        <div
          className="flex items-start md:gap-8 gap-4 self-stretch 
        [&>*]:flex [&>*]:gap-2 [&>*]:flex-col [&>*]:items-start
        [&>*>label]:text-[0.7rem] [&>*>label]:text-fluid-label [&>*>label]:tracking-[4px] [&>*>label]:text-smokey-grey 
        [&>*>input]:text-[1rem] [&>*>input]:text-fluid-input [&>*>input]:md:w-[10rem] [&>*>input]:sm:w-[8rem] [&>*>input]:w-[5rem] [&>*>input]:py-3 [&>*>input]:md:px-6 [&>*>input]:px-3 border-light-grey [&>*>input]:border-[1px] "
        >
          <div>
            <label htmlFor="day">DAY</label>
            <input
              type="number"
              id="day"
              min={1}
              max={31}
              onChange={(e) =>
                setDay(() =>
                  +e.target.value <= 31 && +e.target.value >= 0
                    ? +e.target.value
                    : day
                )
              }
              value={day}
              placeholder="DD"
            />
          </div>
          <div>
            <label htmlFor="month">MONTH</label>
            <input
              type="number"
              id="month"
              min={1}
              max={12}
              value={month}
              onChange={(e) =>
                setMonth(() =>
                  +e.target.value <= 12 && +e.target.value >= 0
                    ? +e.target.value
                    : month
                )
              }
              placeholder="MM"
            />
          </div>
          <div>
            <label htmlFor="year">YEAR</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) =>
                setYear(() =>
                  +e.target.value <= 9999 && +e.target.value >= 0
                    ? +e.target.value
                    : year
                )
              }
              placeholder="YYYY"
            />
          </div>
        </div>
        <div
          className="
        before:bg-light-grey before:self-stretch before:block my-16 
        [&>img]:bg-purple before:h-[1px] 
        relative [&>img]:absolute 
        [&>img]:top-[-2.25rem]  [&>img]:sm:right-0 [&>img]:right-[50%]  [&>img]:rounded-full [&>img]:p-4 [&>img]:cursor-pointer"
          onClick={() => handleClick()}
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
              isNaN(newAge.years) == false
                ? newAge.years
                : "--"}
            </span>{" "}
            years
          </p>
          <p>
            <span>
              {Object.entries(newAge).length !== 0 &&
              isNaN(newAge.months) == false
                ? newAge.months
                : "--"}
            </span>{" "}
            months
          </p>
          <p>
            <span>
              {Object.entries(newAge).length !== 0 &&
              isNaN(newAge.days) == false
                ? newAge.days
                : "--"}
            </span>{" "}
            days
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
