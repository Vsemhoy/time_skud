import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import './components/style/grotpuckov.css';
import { Slider } from 'antd';

const GrotpuckovPage = (props) => {
const [cellWidth, setCellWidth] = useState(5); 
  const [baseUserList, setBaseUserList] = useState([]);
  const [days, setDays] = useState([]);

  const [targetYear, setTargetYear] = useState(dayjs());


  const [prevMonth, setPrevMonth] = useState(-1);

  const handleResize = (newWidth) => {
    setCellWidth(newWidth);
  };


  useEffect(() => {
      let ds = [];
      let first = targetYear.startOf('year');
      let last = targetYear.clone().add(1, 'year');

      let counter = 0;
      while (first.year() !== last.year())
      {
        ds.push(first.clone());
        first = first.add(1, 'day');
        counter++;
        if (counter === 1000){
          break;
        }
      };
      setDays(ds);
      console.log(ds);
  }, [targetYear]);

  return (
    <div>
      <div>
        <Slider value={cellWidth}
        min={3}
        max={100}
        onChange={(ev)=>{setCellWidth(ev)}}
        />
      </div>

      <div>
      <div className="sk-grot-line">
        {days.map((d, index) => {
          const currentMonth = d.month();
          const nextmonth = index > 0 && currentMonth !== days[index - 1].month();
          return (
            <div
              key={d.toString()} // Важно: добавь ключ!
              className={`sk-grot-cell ${nextmonth ? "sk-grot-nextmonth" : ""}`}
              style={{ width: `${cellWidth}px` }}
            >{d.date()}</div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default GrotpuckovPage;