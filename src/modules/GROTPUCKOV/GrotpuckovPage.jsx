import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import './components/style/grotpuckov.css';
import { Affix, Slider, Tooltip } from 'antd';
import { DS_DEFAULT_USER, DS_DEFAULT_USERS, DS_USERLIST_USERS } from '../../CONFIG/DEFAULTSTATE';


import { DatePicker } from "antd"; 
import { getMonthName } from '../../components/Helpers/TextHelpers';
import { GROT_MOCK } from './components/GROTMOCK';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';


const marks = {
  1: 'Январь',
  2: 'Февраль',
  3: 'Март',
  4: 'Апрель',
  5: 'Май',
  6: 'Июнь',
  7: 'Июль',
  8: 'Август',
  9: 'Сентябрь',
  10: 'Октябрь',
  11: 'Ноябрь',
  12: 'Декабрь',
};



const GrotpuckovPage = (props) => {
const [cellWidth, setCellWidth] = useState(5); 
  const [baseUserList, setBaseUserList] = useState([]);
  const [days, setDays] = useState([]);

  const [targetYear, setTargetYear] = useState(dayjs());
  const [targetMonth, setTargetMonth] = useState([dayjs().startOf('month'), dayjs().endOf('month')])
  const [rangeValues, setrangeValues] = useState([dayjs().month(),dayjs().month()]);
  const [countOfMonths, setCountOfMonths] = useState(-1);
  const [monthNames, setMonthNames] = useState([]);

  const [hoveredMonth, setHoveredMonth] = useState(0);
  const [hoveredDayMonth, setHoveredDayMonth] = useState('')

  const [vacations, setVacations] = useState(
    Object.entries(GROT_MOCK).reduce((acc, [userId, userVacations]) => {
      acc[userId] = userVacations.map(vacation => ({
        ...vacation,
        start: dayjs(vacation.start, 'DD-MM-YYYY'),
        end: dayjs(vacation.end, 'DD-MM-YYYY')
      }));
      return acc;
    }, {})
  );

  
  const handleResize = (newWidth) => {
    setCellWidth(newWidth);
  };

  useEffect(() => {
    // console.log('hoveredMonth', hoveredMonth)
  }, [hoveredMonth]);

  useEffect(() => {
    setBaseUserList(DS_USERLIST_USERS.map(item=>({
      id: item.user_id,
      name: item.user_name + " " + item.user_surname,
      key: item.user_id
    })));
  }, []);


  useEffect(() => {
    // console.log('baseUserList', baseUserList);
  }, [baseUserList]);


useEffect(() => {
  setTargetMonth([
    targetYear.clone().month(rangeValues[0] - 1).startOf('month'), // -1 так как месяцы в dayjs 0-11
    targetYear.clone().month(rangeValues[1] - 1).endOf('month')    // -1 аналогично
  ])
}, [rangeValues, targetYear]);

useEffect(() => {
  console.log('targetMonth', targetMonth)
  // console.log('baseUserList', baseUserList);
  let ds = [];
  let mn = [];
  let first = targetYear.clone().month( rangeValues[0] ).startOf('month');
  let last = targetYear.clone().month(rangeValues[1]).endOf('month');

  let current = first.clone();
  let counter = 0;



  const monthCount = targetMonth[1].month() - targetMonth[0].month() + 1;
  setCountOfMonths(monthCount);
  // console.log('monthCount', monthCount);
  let max = first.month() + monthCount;
  for (let i = first.month(); i < max; i++) {
      // console.log('i', i)
      let n = i;
      if (n == 12){ n = 0;};
    mn.push({key: n ,name:  getMonthName(i == 0 ? 12 : i), dates: [first.clone().add(i, 'month'), first.clone().add(i, 'month')]});
  }
  setMonthNames(mn);

  // Изменил условие на проверку даты
  while (current.isBefore(last) || current.isSame(last, 'day')) {
    ds.push(current.clone());
    current = current.add(1, 'day');
    counter++;
    
    // Защита от бесконечного цикла
    if (counter > 366) {
      console.error('Превышено максимальное количество дней!');
      break;
    }
  };
  
  setDays(ds);
  // console.log('Generated days:', ds);
}, [targetYear, targetMonth]);

  return (
    <div>
      <div>
        <Slider value={cellWidth}
          min={3}
          max={100}
          onChange={(ev)=>{setCellWidth(ev)}}
        />

        <div className={'sk-flex'} style={{width: '100%'}}>
          <div style={{padding: '6px 6px'}}>
            <DatePicker 
              value={targetYear}
              onChange={setTargetYear}
              picker="year"
              allowClear={false}
            ></DatePicker>
          </div>

          <div style={{padding: '6px 42px', width: '100%'}}>
            <Slider 
              style={{width: '100%'}} 
              range marks={marks} step={null} defaultValue={[3,5]}
              value={rangeValues}
              min={1}
              max={12}
              onChange={setrangeValues}
            />
          </div>
        </div>


      </div>

    <div className='sk-p-12'>

      <Affix >
       <div>
        <div className="sk-grot-line">
            <div className={'sk-p-6 sk-grot-name'}>
            
          </div>
          <div className={'sk-grot-monthrow'}>
          {monthNames.map((mon)=>(
            <div
              onClick={()=>{countOfMonths > 1 && setTargetMonth(mon.dates)}}
             className={`${hoveredMonth == mon.key ? "sk-grot-month-hovered" : ""}`}>
            <div className="month-navigation" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {countOfMonths === 1 && rangeValues[0] != 1 && (
                <div 
                  className="nav-button"
                  onClick={() => {
                    setrangeValues([rangeValues[0] -1, rangeValues[0] -1]);
                  }}
                 
                >
                  <ArrowLeftOutlined />
                </div>
              )}
              
              <div>
                {mon.name}
              </div>
              
              {countOfMonths === 1 && rangeValues[1] != 12 && (
                <div 
                  className="nav-button"
                  onClick={() => {setrangeValues([rangeValues[0] +1, rangeValues[0] +1]);
                  }}
               
                >
                  <ArrowRightOutlined />
                </div>
              )}
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>
      </Affix>

      <div>


      
      {baseUserList.map((user)=>(
        <div className="sk-grot-line">
        
          <div className={'sk-p-6 sk-grot-name sk-flex-space'}>
            <span>{user.name}</span> <span style={{fontSize: 'small', color: 'blue'}}>{vacations[user.id]?.length}</span>
          </div>
          <div className={`sk-grot-line-days ${countOfMonths < 2 ? "sk-grot-striped" : ""}`}>
          {days.map((d, index) => {
            const currentMonth = d.month();
            const nextmonth = index > 0 && currentMonth !== d.clone().add(1,'day').month();
            let isVacation = false;
             let vacation = null;
             
  
            // Проверяем, есть ли отпуска у пользователя
            if (vacations[user.id]) {
              vacation = vacations[user.id].find(item => (
                
                (d.isSame(item.start, 'day') || d.isAfter(item.start, 'day')) && (d.isSame(item.end, 'day') || d.isBefore(item.end, 'day'))
              ));
              isVacation = !!vacation;
            }

            let isApproved = vacation != null ? vacation.approved : 0;

            return (
              <>
              {isVacation ? (
              <Tooltip title={<div>
              <p>Начало отпуска: {vacation.start.format('DD-MM-YYYY')}</p>
              <p>Конец отпуска: {vacation.end.format('DD-MM-YYYY')}</p>
              <p>{isApproved === 1 ? "Согласован":"Не согласован"}</p>
              </div>}>
                <div
                  onMouseOver={()=>{setHoveredMonth(currentMonth); setHoveredDayMonth(d.unix())}}
                  title={d.format('DD-MM-YYYY')}
                  key={d.toString()} // Важно: добавь ключ!
                  className={`sk-grot-cell ${nextmonth ? "sk-grot-nextmonth" : ""} ${isVacation? "sk-grot-vacc-cell": ""} ${isApproved? "sk-grot-vacc-cell-approved": ""}`}
                  // style={{ width: `${cellWidth}px` }}
                >
                  <div className={` ${d.day() === 0 || d.day() === 6 ? "sk-grot-wd" : ""} ${d.unix() == hoveredDayMonth ? 'sk-grot-hover-col':''}`}>
                    <div className={'sk-grot-item'}>
                    {countOfMonths == 1 ? d.date() : ""}
                    {countOfMonths == 2 && d.date() % 2 == 0 ? d.date() : ""}
                    {countOfMonths == 3 && d.date() % 3 == 0 ?  d.date() : ""}
                    </div>
                  </div>
                </div>
                </Tooltip>
              ) : (
                                <div
                  onMouseOver={()=>{setHoveredMonth(currentMonth); setHoveredDayMonth(d.unix())}}
                  title={d.format('DD-MM-YYYY')}
                  key={d.toString()} // Важно: добавь ключ!
                  className={`sk-grot-cell ${nextmonth ? "sk-grot-nextmonth" : ""}` }
                  // style={{ width: `${cellWidth}px` }}
                >
                  <div className={` ${d.day() === 0 || d.day() === 6 ? "sk-grot-wd" : ""} ${d.unix() == hoveredDayMonth ? 'sk-grot-hover-col':''}`}>
                    <div className={'sk-grot-item'}>
                    {countOfMonths == 1 ? d.date() : ""}
                    {countOfMonths == 2 && d.date() % 2 == 0 ? d.date() : ""}
                    {countOfMonths == 3 && d.date() % 3 == 0 ?  d.date() : ""}
                    </div>
                  </div>
                </div>
              )}
              
              </>
            );
          })}
        </div>
        </div>

      ))}
    </div>
    </div>
    </div>
  );
};

export default GrotpuckovPage;
{/* d.isBetween(item.start, item.end, 'day', '[]') // включая границы */}