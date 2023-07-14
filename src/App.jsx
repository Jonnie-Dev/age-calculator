// import { useState } from "react";
import "./index.css";
import icon from "./assets/icon-arrow.svg";

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-14 rounded-[16px]">
        <div
          className="flex items-start gap-8 self-stretch 
        [&>*]:flex [&>*]:gap-2 [&>*]:flex-col [&>*]:items-start
        [&>*>label]:text-[14px] [&>*>label]:tracking-[4px] [&>*>label]:text-smokey-grey 
        [&>*>input]:text-[32px] [&>*>input]:w-[160px] [&>*>input]:py-3 [&>*>input]:px-6 border-light-grey [&>*>input]:border-[1px] "
        >
          <div>
            <label htmlFor="day">DAY</label>
            <input type="number" id="day" min={1} max={31} placeholder="DD" />
          </div>
          <div>
            <label htmlFor="month">MONTH</label>
            <input type="number" id="month" placeholder="MM" />
          </div>
          <div>
            <label htmlFor="year">YEAR</label>
            <input type="number" id="year" placeholder="YYYY" />
          </div>
        </div>
        <div className="[&>img]:bg-purple before:h-[1px] before:bg-light-grey before:self-stretch before:block my-16 relative [&>img]:absolute [&>img]:top-[-36px] [&>img]:right-0 [&>img]:rounded-full [&>img]:p-4">
          <img src={icon} alt="icon arrow button" />
        </div>
        <div className="text-[104px] font-[800] italic [&>p>span]:text-purple">
          <p>
            <span>--</span> years
          </p>
          <p>
            <span>--</span> months
          </p>
          <p>
            <span>--</span> days
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
